package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.client.api.response.ActivatedJob
import io.camunda.zeebe.client.api.response.DeploymentEvent
import io.camunda.zeebe.client.api.worker.JobClient
import io.camunda.zeebe.client.api.worker.JobHandler
import io.camunda.zeebe.model.bpmn.Bpmn
import org.awaitility.kotlin.await

class DeployMultipleVersionsHandler : JobHandler {

    private val PROCESS_ID = "multiVersion"
    private val RESOURCE_NAME = PROCESS_ID +".bpmn"
    private val LOG =
        org.slf4j.LoggerFactory.getLogger("io.zeebe.chaos.DeployMultipleVersionsHandler")

    companion object {
        const val JOB_TYPE = "deploy-different-versions.sh"
    }

    override fun handle(testbench: JobClient, job: ActivatedJob) {
        setMDCForJob(job)
        LOG.info("Handle job $JOB_TYPE")

        createClientForClusterUnderTest(job).use { clusterUnderTest ->
            LOG.info("Connected to ${clusterUnderTest.configuration.gatewayAddress}, start deploying multiple versions...")

            val lastVersion = (1..10)
                    .map{ waitForModelDeployment(clusterUnderTest, it) }
                    .map{ it?.processes?.get(0)?.version ?: -1 }
                    .last()

            if (lastVersion < 10) {
                val message =
                    "Expected to deploy 10 different versions of process $PROCESS_ID, but only deployed $lastVersion"
                LOG.warn("$message. Fail $JOB_TYPE")
                testbench.newFailCommand(job.key)
                        .retries(job.retries)
                        .errorMessage(message)
                        .send()
            } else {
                LOG.info("Deployed 10 different versions of process $PROCESS_ID, last version: $lastVersion. Complete $JOB_TYPE")
                testbench.newCompleteCommand(job.key).send()
            }
        }
    }

    private fun waitForModelDeployment(client: ZeebeClient, index: Int): DeploymentEvent? {
        var event: DeploymentEvent? = null
        await.untilAsserted {
            event = client.newDeployCommand()
                    .addProcessModel(
                            Bpmn.createExecutableProcess(PROCESS_ID)
                                    .name("Multi version process")
                                    .startEvent("start-" + index)
                                    .endEvent()
                                    .done(),
                            RESOURCE_NAME)
                    .send()
                    .join()
        }
        return event
    }
}
