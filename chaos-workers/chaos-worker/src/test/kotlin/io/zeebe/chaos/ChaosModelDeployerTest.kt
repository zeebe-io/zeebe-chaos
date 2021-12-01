package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.protocol.record.Record
import org.assertj.core.api.Assertions.assertThat
import org.awaitility.kotlin.await
import org.camunda.community.eze.EmbeddedZeebeEngine
import org.camunda.community.eze.RecordStreamSource
import org.camunda.community.eze.ZeebeEngine
import org.camunda.community.eze.ZeebeEngineClock
import org.junit.jupiter.api.Test

@EmbeddedZeebeEngine
class ChaosModelDeployerTest {

    private lateinit var zeebe: ZeebeEngine
    private lateinit var client: ZeebeClient
    private lateinit var recordStream: RecordStreamSource

    @Test
    fun `should deploy models`() {
        // given
        val chaosModelDeployer = ChaosModelDeployer(client)

        // when
        chaosModelDeployer.deployChaosModels()

        // then
        await.alias("Should deploy three models")
            .until {
                recordStream.processRecords().count() == 3
            }

        val chaosModelNames = chaosModelDeployer.getChaosModelNames()
        val processList = recordStream.processRecords().toList()
        assertThat(processList.size).isEqualTo(chaosModelNames.size)
        processList.forEach{
            assertThat(it.value.resourceName).isIn(chaosModelNames)
        }
    }

}
