package io.zeebe.chaos

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import java.io.File

class FileResolverTest {

    @Test
    fun `should resolve worker deployment dir from jar`() {
        // given
        val fileResolver = FileResolver()

        // when
        val resolveWorkerDeploymentDir = fileResolver.resolveWorkerDeploymentDir()

        // then
        assertThat(resolveWorkerDeploymentDir).exists()
        assertThat(resolveWorkerDeploymentDir).isDirectory
        assertThat(resolveWorkerDeploymentDir.resolve("worker.yaml")).exists().isFile
    }

    @Test
    fun `should resolve bpmn model from jar`() {
        // given
        val fileResolver = FileResolver()

        // when
        val bpmnModelStream = fileResolver.resolveBPMNModelStream("actionRunner")

        // then
        assertThat(bpmnModelStream).isNotNull
        assertThat(bpmnModelStream).isNotEmpty
    }

    @Test
    fun `should not resolve bpmn model if not exist`() {
        // given
        val fileResolver = FileResolver()

        // when
        val bpmnModelStream = fileResolver.resolveBPMNModelStream("notExist.bpmn")

        // then
        assertThat(bpmnModelStream).isNull()
    }

    @Test
    fun `should resolve scripts dir from jar`() {
        // given
        val fileResolver = FileResolver()

        // when
        val scriptsDir = fileResolver.resolveScriptsDir()

        // then
        assertThat(scriptsDir).isNotNull.isNotBlank
        val scriptsDirFile = File(scriptsDir!!)
        assertThat(scriptsDirFile).exists()
        assertThat(scriptsDirFile).isDirectory
        assertThat(scriptsDirFile.listFiles()).isNotEmpty
    }

    @Test
    fun `should not resolve cluster plan dir if not existing`() {
        // given
        val fileResolver = FileResolver()

        // when
        val nonExistingClusterplan = fileResolver.resolveClusterPlanDir("yolo")

        // then
        assertThat(nonExistingClusterplan).isNull()
    }

    @Test
    fun `should resolve cluster plan dir from jar`() {
        // given
        val fileResolver = FileResolver()

        // when
        val clusterplan = fileResolver.resolveClusterPlanDir("production-m")

        // then
        assertThat(clusterplan).isNotNull.isNotBlank
        val clusterPlanDir = File(clusterplan!!)
        assertThat(clusterPlanDir).exists().isDirectory
        assertThat(clusterPlanDir.listFiles()).isNotEmpty
    }
}
