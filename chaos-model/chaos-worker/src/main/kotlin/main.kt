import io.zeebe.client.ZeebeClient
import io.zeebe.client.api.response.ActivatedJob
import io.zeebe.client.api.worker.JobClient
import java.io.File
import java.util.concurrent.CountDownLatch

fun main(args: Array<String>) {

    val latch = CountDownLatch(1)
    val zeebeClient = ZeebeClient.newClientBuilder().usePlaintext().build()
    (zeebeClient.newWorker().jobType("verify-readiness.sh").handler(::handler).open()).use {
     latch.await()
    }
}

fun handler(client: JobClient, activatedjob: ActivatedJob) {
    println(activatedjob.variablesAsMap)
    val provider = activatedjob.variablesAsMap["provider"]!! as Map<String, Any>

    val args = provider["arguments"]
    args?.let {
        println("Arguments: $it")
    }


    val command = provider["path"]!!.toString()
    val scriptPath = File("../../chaos-experiments/scripts/")
    println("Path: ${scriptPath.absolutePath}")

    val processBuilder = ProcessBuilder("$scriptPath/$command")
        .inheritIO()
        .directory(scriptPath)
    processBuilder.environment().put("CHAOS_SETUP", "helm");
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
