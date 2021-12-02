package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.client.api.worker.JobWorker
import io.camunda.zeebe.model.bpmn.Bpmn
import io.camunda.zeebe.protocol.record.intent.JobIntent
import io.camunda.zeebe.protocol.record.value.ErrorType
import org.assertj.core.api.Assertions
import org.assertj.core.api.Assertions.assertThat
import org.awaitility.kotlin.await
import org.camunda.community.eze.EmbeddedZeebeEngine
import org.camunda.community.eze.RecordStream.withIntent
import org.camunda.community.eze.RecordStreamSource
import org.camunda.community.eze.ZeebeEngine
import org.junit.After
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

@EmbeddedZeebeEngine
class ReadChaosExperimentsHandlerTest {
    private lateinit var client: ZeebeClient
    private lateinit var recordStream: RecordStreamSource
    private lateinit var worker : JobWorker

    @BeforeEach
    fun setup() {
        val bpmnModelInstance =
            Bpmn
                .createExecutableProcess("readExperiments")
                .startEvent()
                .serviceTask("readExp")
                { task -> task.zeebeJobType(ReadChaosExperimentsHandler.JOB_TYPE) }
                .endEvent()
                .done()
        client.deployModel(bpmnModelInstance, "readExperiments")

        val readChaosExperimentsHandler =
            ReadChaosExperimentsHandler{ }

        worker = client
            .newWorker()
            .jobType(readChaosExperimentsHandler.getJobType())
            .handler(readChaosExperimentsHandler)
            .open()
    }

    @AfterEach
    fun tearDown() {
        worker.close()
    }

    @Test
    fun `should fail job on reading experiments without clusterplan`() {
        // given
        // when
        val instance = client.newCreateInstanceCommand()
            .bpmnProcessId("readExperiments")
            .latestVersion()
            .send()
            .join()

        // then
        await.alias("should create incident").until {
            recordStream.incidentRecords()
                .withProcessInstanceKey(instance.processInstanceKey)
                .withErrorType(ErrorType.JOB_NO_RETRIES).any()
        }

        val incident = recordStream.incidentRecords()
            .withProcessInstanceKey(instance.processInstanceKey)
            .withErrorType(ErrorType.JOB_NO_RETRIES).first()

        assertThat(incident.value.errorMessage)
            .isEqualTo("Expected to get an valid cluster plan to read the chaos experiments, but got nothing instead.")
    }

    @Test
    fun `should fail job on reading experiments with non-existing clusterplan`() {
        // given
        // when
        val instance = client.newCreateInstanceCommand()
            .bpmnProcessId("readExperiments")
            .latestVersion()
            .variables(mapOf("clusterPlan" to "none"))
            .send()
            .join()

        // then
        await.alias("should create incident").until {
            recordStream.incidentRecords()
                .withProcessInstanceKey(instance.processInstanceKey)
                .withErrorType(ErrorType.JOB_NO_RETRIES).any()
        }

        val incident = recordStream.incidentRecords()
            .withProcessInstanceKey(instance.processInstanceKey)
            .withErrorType(ErrorType.JOB_NO_RETRIES).first()

        assertThat(incident.value.errorMessage)
            .isEqualTo("Expected to read chaos experiments for cluster plan 'none', but experiments were not found.")
    }

    @Test
    fun `should complete job when no experiments exist with existing clusterplan`() {
        // given
        // when
        val instance = client.newCreateInstanceCommand()
            .bpmnProcessId("readExperiments")
            .latestVersion()
            .variables(mapOf("clusterPlan" to "empty"))
            .send()
            .join()

        // then
        await.alias("should complete job").until {
            recordStream.jobRecords()
                .withProcessInstanceKey(instance.processInstanceKey)
                .withIntent(JobIntent.COMPLETED)
                .any()
        }

        val completedJob = recordStream.jobRecords()
            .withProcessInstanceKey(instance.processInstanceKey)
            .withIntent(JobIntent.COMPLETED)
            .first()

        val variables = completedJob.value.variables

        assertThat(variables).isNotNull
        assertThat(variables["experiments"]).isNotNull

        val experiments = variables["experiments"] as List<LinkedHashMap<String, Object>>
        assertThat(experiments).isEmpty()
    }

    @Test
    fun `should read experiments with existing clusterplan`() {
        // given
        // when
        val instance = client.newCreateInstanceCommand()
            .bpmnProcessId("readExperiments")
            .latestVersion()
            .variables(mapOf("clusterPlan" to "Production - M"))
            .send()
            .join()

        // then
        await.alias("should complete job").until {
            recordStream.jobRecords()
                .withProcessInstanceKey(instance.processInstanceKey)
                .withIntent(JobIntent.COMPLETED)
                .any()
        }

        val completedJob = recordStream.jobRecords()
            .withProcessInstanceKey(instance.processInstanceKey)
            .withIntent(JobIntent.COMPLETED)
            .first()

        val variables = completedJob.value.variables

        assertThat(variables).isNotNull
        assertThat(variables["experiments"]).isNotNull

        val experiments = variables["experiments"] as List<LinkedHashMap<String, Object>>
        assertThat(experiments).isNotEmpty
        experiments.forEach {
            assertThat(it["version"]).isNotNull
            assertThat(it["title"]).isNotNull
            assertThat(it["description"]).isNotNull
            assertThat(it["steady-state-hypothesis"]).isNotNull
            assertThat(it["method"]).isNotNull
        }
    }
}
