package io.zeebe.chaos

import java.io.File

class WorkerDeploymentFileResolverFileResolver {

    fun resolveWorkerDeploymentDir(): File {
        // In order to resolve it correctly we use the direct path to the file, and return the parent.
        // This makes sure that the file really exist and can be resolved and doesn't conflict with
        // the tests, where we have in the test-resources and equal named directory.
        val workerPath =
            File(this::class.java.getResource("/chaos-experiments/worker.yaml")!!.path)
        return workerPath.parentFile
    }

}
