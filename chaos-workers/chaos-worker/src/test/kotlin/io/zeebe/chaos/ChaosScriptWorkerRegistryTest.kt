package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.protocol.record.intent.JobBatchIntent
import org.assertj.core.api.Assertions.assertThat
import org.awaitility.Awaitility.await
import org.camunda.community.eze.EmbeddedZeebeEngine
import org.camunda.community.eze.RecordStreamSource
import org.junit.jupiter.api.Test

@EmbeddedZeebeEngine
class ChaosScriptWorkerRegistryTest {
    private lateinit var client: ZeebeClient
    private lateinit var recordStream: RecordStreamSource

    @Test
    fun `should load scripts`() {
        // given

        // when
        val workerRegistry = ChaosScriptWorkerRegistry(client, FileResolver())

        // then
        assertThat(workerRegistry.getScriptNames()).isNotNull.isNotEmpty
    }

    @Test
    fun `should register workers`() {
        // given
        val workerRegistry = ChaosScriptWorkerRegistry(client, FileResolver())
        val scriptNames = workerRegistry.getScriptNames()

        // when
        workerRegistry.registerChaosScriptWorkers()

        // then
        await().alias("should register workers for scripts").until {
            recordStream.jobBatchRecords()
                .filter { record -> record.intent == JobBatchIntent.ACTIVATE }
                .count() >= scriptNames.size
        }


        assertThat(recordStream.jobBatchRecords()
            .filter { record -> record.intent == JobBatchIntent.ACTIVATE }
            .map { record -> record.value.type }).containsExactlyInAnyOrder(*scriptNames.toTypedArray())
    }
}
