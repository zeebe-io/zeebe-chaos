package io.zeebe.chaos

import io.camunda.zeebe.client.api.response.ActivatedJob
import io.camunda.zeebe.client.api.worker.JobClient
import java.io.File
import java.nio.file.Files

class ReadChaosExperimentsHandler(private val registerJob : RegisterJob, private val fileResolver: FileResolver) : ChaosJobHandler {

    companion object {
        private val LOG =
            org.slf4j.LoggerFactory.getLogger("io.zeebe.chaos.ReadChaosExperimentsHandler")
        private const val EXPERIMENT_FILE_NAME = "experiment.json"

        const val JOB_TYPE = "readExperiments"
    }
    override fun getJobType(): String {
        return JOB_TYPE
    }

    override fun handle(client: JobClient, job: ActivatedJob) {
        registerJob(job)

        val clusterPlanValue = job.variablesAsMap["clusterPlan"]
        if (clusterPlanValue == null) {
            val errorMessage =
                "Expected to get an valid cluster plan to read the chaos experiments, but got nothing instead."
            failJob(errorMessage, client, job)
            return
        }

        val clusterPlan = clusterPlanValue.toString()
            .lowercase() // we expected lower case names
            .replace("\\s".toRegex(), "") // without spaces, like production-m

        LOG.info("Read experiments for cluster plan: $clusterPlan")
        val clusterPlanExperimentsPath = fileResolver.resolveClusterPlanDir(clusterPlan)
        if (!clusterPlanExperimentsPath.exists()) {
            val errorMessage =
                "Expected to read chaos experiments under '$clusterPlanExperimentsPath', but directory doesn't exist."
            failJob(errorMessage, client, job)
            return
        }

        var experiments = listOf<String>()
        val experimentFiles = clusterPlanExperimentsPath.listFiles()
        experimentFiles?.let {
            experiments =
                it.filter { file -> file.isDirectory }
                    .map { Files.readString(File(it, EXPERIMENT_FILE_NAME).toPath()) }
        }

        client.newCompleteCommand(job.key).variables("{\"experiments\": $experiments}").send()
    }

    private fun failJob(
        errorMessage: String,
        client: JobClient,
        job: ActivatedJob
    ) {
        LOG.warn(errorMessage)
        client
            .newFailCommand(job.key)
            .retries(0)
            .errorMessage(errorMessage)
            .send()
            .join()
    }
}
