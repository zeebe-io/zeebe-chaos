package io.zeebe.chaos

import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import java.io.File
import java.io.InputStream

/**
 * Helper class to resolve all necessary files and directories in the chaos worker application.
 */
class FileResolver(val rootPath : String = DEFAULT_ROOT_PATH) {

    companion object {
        /**
         * Default root path, relative to the project.
         */
        private const val DEFAULT_ROOT_PATH = "../../chaos-experiments/"
    }

    private val chaosDir = "$rootPath/camunda-cloud/"
    private val scriptsDir = "$rootPath/scripts"

    fun resolveWorkerDeploymentDir(): File {
        val workerPath = File("$chaosDir/worker.yaml")
        return workerPath.parentFile
    }

    fun resolveBPMNModelStream(modelName: String) : InputStream? {
        return this::class.java.getResourceAsStream("/$modelName.bpmn")
    }

    fun resolveClusterPlanDir(clusterPlan : String): File {
        return File("$chaosDir/$clusterPlan")
    }

    fun resolveScriptsDir(): File {
        return File(scriptsDir)
    }
}
