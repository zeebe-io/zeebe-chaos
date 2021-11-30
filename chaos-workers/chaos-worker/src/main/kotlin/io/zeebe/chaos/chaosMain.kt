package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.client.api.response.ActivatedJob
import io.camunda.zeebe.client.api.worker.JobClient
import io.camunda.zeebe.client.impl.oauth.OAuthCredentialsProviderBuilder
import io.camunda.zeebe.model.bpmn.BpmnModelInstance
import org.awaitility.Awaitility
import org.awaitility.pollinterval.FibonacciPollInterval
import org.slf4j.MDC
import java.io.BufferedReader
import java.io.File
import java.io.InputStream
import java.io.InputStreamReader
import java.nio.charset.StandardCharsets.UTF_8
import java.nio.file.Files
import java.time.Duration
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import kotlin.concurrent.thread

private const val ENV_TESTBENCH_ADDRESS = "TESTBENCH_ADDRESS"
private const val ENV_TESTBENCH_CLIENT_ID = "TESTBENCH_CLIENT_ID"
private const val ENV_TESTBENCH_CLIENT_SECRET = "TESTBENCH_CLIENT_SECRET"
private const val ENV_TESTBENCH_AUTHORIZATION_SERVER_URL = "TESTBENCH_AUTHORIZATION_SERVER_URL"

private const val ROOT_PATH = "zeebe-chaos/chaos-experiments"
private const val SHELL_EXTENSION = "sh"
private const val EXPERIMENT_FILE_NAME = "experiment.json"

private val LOG = org.slf4j.LoggerFactory.getLogger("io.zeebe.chaos.ChaosWorker")

private fun createTestbenchClient(): ZeebeClient {
    val audience = OAuthCredentialsProviderBuilder()
        .audience(System.getenv(ENV_TESTBENCH_ADDRESS).removeSuffix(":443"))
        .authorizationServerUrl(System.getenv(ENV_TESTBENCH_AUTHORIZATION_SERVER_URL))
        .clientId(System.getenv(ENV_TESTBENCH_CLIENT_ID))
        .clientSecret(System.getenv(ENV_TESTBENCH_CLIENT_SECRET))
        .build()

    return ZeebeClient.newClientBuilder()
        .credentialsProvider(audience)
        .gatewayAddress(System.getenv(ENV_TESTBENCH_ADDRESS))
        .numJobWorkerExecutionThreads(4)
        .build()
}

fun main() {
    initializeAwaitility()
    // given
    updateRepo() // get latest zeebe-chaos repo changes
    val testbenchClient = createTestbenchClient()

    LOG.info("Connected to ${testbenchClient.configuration.gatewayAddress}")
    val topology = testbenchClient.newTopologyRequest().send().join()
    LOG.info("Topology: $topology")

    ChaosModelDeployer(client = testbenchClient).deployChaosModels()

    // register workers
    val scriptPath = File("$ROOT_PATH/scripts/")
    LOG.info("Fetch script from folder ${scriptPath.absolutePath}")

    scriptPath.listFiles { file -> file.extension == SHELL_EXTENSION }!!
        .map { it.name }
        .filterNot { it.contains("utils") }
        .filterNot { it.equals(AwaitMessageCorrelationHandler.JOB_TYPE) }
        .filterNot { it.equals(AwaitProcessWithResultHandler.JOB_TYPE) }
        .filterNot { it.equals(DeployMultipleVersionsHandler.JOB_TYPE) }
        .forEach { script ->
            LOG.info("Start worker with type `$script`")
            testbenchClient.newWorker().jobType(script).handler(::handler).open()
        }

    testbenchClient.newWorker().jobType(AwaitMessageCorrelationHandler.JOB_TYPE)
        .handler(AwaitMessageCorrelationHandler()).open()
    testbenchClient.newWorker().jobType(AwaitProcessWithResultHandler.JOB_TYPE)
        .handler(AwaitProcessWithResultHandler()).open()
    testbenchClient.newWorker().jobType(DeployMultipleVersionsHandler.JOB_TYPE)
        .handler(DeployMultipleVersionsHandler()).open()

    testbenchClient.newWorker().jobType("readExperiments").handler(::readExperiments).open()

    // keep workers running
    val latch = CountDownLatch(1)
    Runtime.getRuntime()
        .addShutdownHook(
            object : java.lang.Thread("Close thread") {
                override fun run() {
                    LOG.info("Received shutdown signal")
                    latch.countDown()
                }
            })

    latch.await()
}

private fun initializeAwaitility() {
    // set a default timeout for all awaitility calls
    Awaitility.setDefaultTimeout(Duration.ofHours(1))
    Awaitility.setDefaultPollInterval(FibonacciPollInterval.fibonacci(TimeUnit.SECONDS))
}

fun readExperiments(client: JobClient, activatedjob: ActivatedJob) {
    setMDCForJob(activatedjob)
    val clusterPlan = activatedjob
        .variablesAsMap["clusterPlan"]!!
        .toString()
        .toLowerCase() // we expected lower case names
        .replace("\\s".toRegex(), "") // without spaces, like production-m

    LOG.info("Read experiments for cluster plan: $clusterPlan")

    val clusterPlanDir = File("$ROOT_PATH/camunda-cloud/$clusterPlan")
    val experiments = clusterPlanDir.listFiles()!!.map {
        Files.readString(File(it, EXPERIMENT_FILE_NAME).toPath())
    }

    client.newCompleteCommand(activatedjob.key).variables("{\"experiments\": $experiments}").send()
}

fun handler(client: JobClient, activatedjob: ActivatedJob) {
    val clusterId = activatedjob.variablesAsMap["clusterId"]!! as String
    setMDCForJob(activatedjob)

    val namespace = "$clusterId-zeebe"
    prepareForChaosExperiments(namespace)

    val provider = activatedjob.variablesAsMap["provider"]!! as Map<String, Any>
    val command = provider["path"]!!.toString()
    val scriptPath = File("$ROOT_PATH/scripts/")

    val commandList = createCommandList(scriptPath, command, provider)
    LOG.info("Commands to run: $commandList")

    val processBuilder = ProcessBuilder(commandList)
        .directory(scriptPath)
    processBuilder
        .environment()["NAMESPACE"] = namespace

    var timeoutInSeconds = 15 * 60L // per default 15 min timeout
    provider["timeout"]?.let {
        timeoutInSeconds = provider["timeout"].toString().toLong()
    }

    // redirects the error stream to the output stream
    processBuilder.redirectErrorStream(true)
    val process = processBuilder.start()
    // the input stream of the process object is connected to the output stream we want to consume, don't ask.
    consumeOutputStream(activatedjob, process.inputStream)
    val inTime = process.waitFor(timeoutInSeconds, TimeUnit.SECONDS)

    if (inTime && process.exitValue() == 0) {
        client.newCompleteCommand(activatedjob.key).send()
    } else {
        process.destroyForcibly()
    }
}

internal fun consumeOutputStream(job : ActivatedJob, inputStream: InputStream) {
    thread(start = true) {
        setMDCForJob(job)
        BufferedReader(InputStreamReader(inputStream, UTF_8)).use { reader ->
            reader.forEachLine {
                LOG.debug(it)
            }
        }
    }
}


private fun createCommandList(
    scriptPath: File,
    command: String,
    provider: Map<String, Any>
): MutableList<String> {
    val rootCommand = "${scriptPath.absolutePath}/$command"
    val commandList = mutableListOf(rootCommand)

    val args = provider["arguments"]
    args?.let {
        when (it) {
            is List<*> -> {
                commandList.addAll(it as List<String>)
            }
            is String -> {
                commandList.add(it)
            }
            else -> {
                // ?!
            }
        }
    }
    return commandList
}

/**
 * Get latest state of the zeebe-chaos repository, so we can run the latest experiments.
 */
fun updateRepo() {
    runCommands(File(ROOT_PATH), "git", "pull", "origin", "master")
}

/**
 * Prepares for running chaos experiments:
 *
 * * Switch the namespace to the target namespace (kubens "$NAMESPACE")
 * * deploy workers for chaos experiments
 *
 * Workers are needed in some of our chaos experiments.
 * Be aware that we are not delete them here, since if the experiments fails we might want to check
 * the logs of the workers AND they are deleted if we delete the namespace anyway.
 * kubectl apply -f worker.yaml &>> "$logFile"
 */
fun prepareForChaosExperiments(namespace: String) {
    LOG.info("Prepare chaos experiments.")

    // we should not use kubens when we want to scale our workers, it will change the shared context
    // runCommands(null, "kubens", namespace)
    val workerPath = File("$ROOT_PATH/camunda-cloud")
    runCommands(workerPath, "kubectl", "--namespace=$namespace", "apply", "--filename=worker.yaml")
}

fun runCommands(workingDir: File?, vararg commands: String): Int {
    val processBuilder = ProcessBuilder(commands.asList())
    workingDir?.let {
        processBuilder.directory(workingDir)
    }
    val process = processBuilder.start()
    process.waitFor()
    LOG.info(
        "Run ${commands.contentToString()} \n {} {}",
        String(process.inputStream.readAllBytes()),
        String(process.errorStream.readAllBytes())
    )
    return process.exitValue()
}

internal fun ZeebeClient.deployModel(model: BpmnModelInstance, name: String): Boolean {
    return succeeds({
        this.newDeployCommand().addProcessModel(model, name).send().join()
    }, { exc -> LOG.warn("Deployment of $name failed with exception: ${exc.message}") })
}

internal fun createClientForClusterUnderTest(job: ActivatedJob): ZeebeClient {
    val authenticationDetails =
        job.variablesAsMap["authenticationDetails"]!! as Map<String, Any>
    val clientId = authenticationDetails["clientId"]!!.toString()
    val clientSecret = authenticationDetails["clientSecret"]!!.toString()
    val authorizationURL = authenticationDetails["authorizationURL"]!!.toString()
    val audience = authenticationDetails["audience"]!!.toString()
    val contactPoint = authenticationDetails["contactPoint"]!!.toString()

    val credentialsProvider = OAuthCredentialsProviderBuilder()
        .audience(audience)
        .authorizationServerUrl(authorizationURL)
        .clientId(clientId)
        .clientSecret(clientSecret)
        .credentialsCachePath("/tmp/${clientId}.cred")
        .build()

    return ZeebeClient.newClientBuilder()
        .credentialsProvider(credentialsProvider)
        .gatewayAddress(contactPoint)
        .build()
}

internal fun succeeds(
    callable: () -> Unit,
    exceptionHandler: (e: Exception) -> Unit = { exc -> LOG.warn("Exception occurred: ${exc.message}") }
): Boolean {
    return try {
        callable.invoke()
        true
    } catch (exc: Exception) {
        exceptionHandler.invoke(exc)
        false
    }
}

internal fun setMDCForJob(job: ActivatedJob) {
    MDC.put("jobType", job.type)

    val clusterId = job.variablesAsMap["clusterId"]!! as String
    MDC.put("clusterId", clusterId)

    val clusterPlan = job.variablesAsMap["clusterPlan"]!! as String
    MDC.put("clusterPlan", clusterPlan)

    MDC.put("processInstanceKey", job.processInstanceKey.toString())
}
