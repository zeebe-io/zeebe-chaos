package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient

class ChaosScriptWorkerRegistry(private val client: ZeebeClient, private val fileResolver: FileResolver) {

    private val scripts: List<String> =
        fileResolver.resolveScriptsDir().let { scriptPath ->
            scriptPath.listFiles { file -> file.extension == SHELL_EXTENSION }!!
                .map { it.name }
                .filterNot { it.contains("utils") }
                .filterNot { it.equals(AwaitMessageCorrelationHandler.JOB_TYPE) }
                .filterNot { it.equals(AwaitProcessWithResultHandler.JOB_TYPE) }
                .filterNot { it.equals(DeployMultipleVersionsHandler.JOB_TYPE) }
        }.toList()

    companion object {
        private const val SHELL_EXTENSION = "sh"
        private val LOG = org.slf4j.LoggerFactory.getLogger("io.zeebe.chaos.ChaosScriptWorkerRegistry")
    }

    fun getScriptNames() : List<String> {
        return scripts
    }

    fun registerChaosScriptWorkers() {
        scripts.let {
            it.forEach{ script ->
                LOG.info("Start worker with type `$script`")
                client.newWorker().jobType(script).handler(::chaosScriptHandler).open()
            }
        }
    }
}
