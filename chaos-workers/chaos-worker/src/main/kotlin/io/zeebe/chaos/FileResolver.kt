package io.zeebe.chaos

import java.io.File
import java.io.InputStream

/**
 * Helper class to resolve all necessary files and directories in the chaos worker application.
 */
class FileResolver {
    companion object {
        private const val CHAOS_DIR = "/chaos-experiments"
        private const val SCRIPTS_DIR = "/scripts"
    }

    fun resolveWorkerDeploymentDir(): File {
        // In order to resolve it correctly we use the direct path to the file, and return the parent.
        // This makes sure that the file really exist and can be resolved and doesn't conflict with
        // the tests, where we have in the test-resources and equal named directory.
        val workerPath =
            File(this::class.java.getResource("$CHAOS_DIR/worker.yaml")!!.path)
        return workerPath.parentFile
    }

    fun resolveBPMNModelStream(modelName: String) : InputStream? {
        return this::class.java.getResourceAsStream("/$modelName.bpmn")
    }

    fun resolveClusterPlanDir(clusterPlan : String): String? {
        return (this::class.java::getResource)("$CHAOS_DIR/$clusterPlan")?.path
    }

    fun resolveScriptsDir(): String? {
        return (this::class.java::getResource)(SCRIPTS_DIR)?.path
    }
}
