import io.zeebe.client.ZeebeClient
import io.zeebe.client.api.response.ActivatedJob
import io.zeebe.client.api.worker.JobClient
import java.io.File
import java.nio.file.Files
import java.util.concurrent.CountDownLatch

const val ROOT_PATH="../../chaos-experiments"

fun main(args: Array<String>) {
    val latch = CountDownLatch(1)

    val zeebeClient = ZeebeClient.newClientBuilder().usePlaintext().build()
    println("Connected to ${zeebeClient.configuration.gatewayAddress}")

    val scriptPath = File("$ROOT_PATH/scripts/")
    println("Fetch script from folder ${scriptPath.absolutePath}")

    scriptPath.listFiles{ file -> file.extension == "sh" }!!
            .map { it.name }
            .filterNot { it.contains("utils") }
            .forEach { script ->
        println("Start worker with type `$script`")
        zeebeClient.newWorker().jobType(script).handler(::handler).open()
    }

    zeebeClient.newWorker().jobType("readExperiments").handler(::readExperiments).open()
    latch.await()
}

fun readExperiments(client: JobClient, activatedjob: ActivatedJob) {
    val clusterPlan = activatedjob.variablesAsMap["clusterPlan"]!!.toString()

    val clusterPlanDir = File("$ROOT_PATH/camunda-cloud/$clusterPlan")

    val experiments = clusterPlanDir.listFiles()!!.map {
        Files.readString(File(it, "experiment.json").toPath())
    }

    client.newCompleteCommand(activatedjob.key).variables("{\"experiments\": $experiments}").send()
}

fun handler(client: JobClient, activatedjob: ActivatedJob) {
    val provider = activatedjob.variablesAsMap["provider"]!! as Map<String, Any>

    val command = provider["path"]!!.toString()
    val scriptPath = File("$ROOT_PATH/scripts/")
    println("Path: ${scriptPath.absolutePath}")

    val rootCommand = "$scriptPath/$command"
    val commandList = mutableListOf(rootCommand)

    val args = provider["arguments"]
    args?.let {
        println("Arguments: $it")
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

    val processBuilder = ProcessBuilder(commandList)
        .inheritIO()
        .directory(scriptPath)

    processBuilder.environment()["CHAOS_SETUP"] = "helm";
    val process = processBuilder.start()
    val exitValue = process.waitFor()

    if (exitValue == 0)
    {
        client.newCompleteCommand(activatedjob.key).send()
    }
    else {
        client.newFailCommand(activatedjob.key).retries(0).send();
    }
}
