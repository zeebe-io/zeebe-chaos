package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.zeebe.chaos.FileResolver.Companion.SCRIPTS_DIR
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import java.io.File

class ChaosScriptWorkerRegistry(val client: ZeebeClient) {

    private val scripts: List<String> =
        // We need to use here a spring helper class, in order to resolve the files inside a
        // jar. In unit tests it simply works with `File#listFiles` but at the end in the jar
        // not anymore, because the jar has to be handled like a ZIP.
        // See https://stackoverflow.com/questions/51972708/listfiles-method-in-java-doesnt-work-in-jar
        // If we directly address the file and resolve it is not an issue, but for listing files it is.
                PathMatchingResourcePatternResolver().getResources("$SCRIPTS_DIR/*")
                .map { r -> r.filename!! }
                .filter { name -> name.contains(SHELL_EXTENSION) }
                .filterNot { it.contains("utils") }
                .filterNot { it.equals(AwaitMessageCorrelationHandler.JOB_TYPE) }
                .filterNot { it.equals(AwaitProcessWithResultHandler.JOB_TYPE) }
                .filterNot { it.equals(DeployMultipleVersionsHandler.JOB_TYPE) }
                .toList()

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
