package io.zeebe.chaos

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class PrepareForChaosExperimentsTest {

    @Test
    fun `should resolve worker deployment from jar`() {
        // given
        val fileResolver = WorkerDeploymentFileResolverFileResolver()

        // when
        val resolveWorkerDeploymentDir = fileResolver.resolveWorkerDeploymentDir()

        // then
        assertThat(resolveWorkerDeploymentDir).exists()
        assertThat(resolveWorkerDeploymentDir).isDirectory
        assertThat(resolveWorkerDeploymentDir.resolve("worker.yaml")).exists().isFile
    }
}
