package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.client.api.response.ActivatedJob
import io.camunda.zeebe.client.api.worker.JobClient
import io.camunda.zeebe.client.api.worker.JobHandler
import io.camunda.zeebe.model.bpmn.Bpmn
import org.awaitility.kotlin.await

class AwaitMessageCorrelationHandler(val createClient: (ActivatedJob) -> ZeebeClient = ::createClientForClusterUnderTest) :
    JobHandler {

    companion object {
        const val JOB_TYPE = "await-message-correlation.sh"

        private const val PROCESS_ID = "oneReceiveMsgEvent"
        private val PROCESS =
            Bpmn.createExecutableProcess(PROCESS_ID).startEvent("StartEvent_1")
                .intermediateCatchEvent()
                .message { it.name("test").zeebeCorrelationKeyExpression("test") }
                .endEvent("end").done()
        private val VARIABLES = mapOf("test" to "0")
        val LOG =
            org.slf4j.LoggerFactory.getLogger(AwaitMessageCorrelationHandler::class.java.name)
    }

    override fun handle(client: JobClient, job: ActivatedJob) {
        setMDCForJob(job)
        LOG.info("Handle job $JOB_TYPE")

        createClient(job).use {
            LOG.info("Connected to ${it.configuration.gatewayAddress}")

            LOG.info("Deploying model")

            await.until { ->
                it.deployModel(
                    PROCESS,
                    "oneReceiveMsgEvent.bpmn"
                )
            }

            LOG.info("Creating process instance")
            await.until { -> createInstanceWithResult(it) }
        }

        client.newCompleteCommand(job.key).send()
    }

    private fun createInstanceWithResult(
        client: ZeebeClient
    ): Boolean {
        return succeeds({ ->
            client.newCreateInstanceCommand().bpmnProcessId(PROCESS_ID).latestVersion().variables(
                VARIABLES
            )
                .withResult().send()
                .join()
        })
    }
}
