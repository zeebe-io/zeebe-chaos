package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.model.bpmn.Bpmn
import java.io.File

class ChaosModelDeployer(val client: ZeebeClient) {
    companion object {
        val MODEL_NAMES = listOf("actionRunner", "chaosExperiment", "chaosToolkit")
    }

    fun deployChaosModels() {
        for (modelName in MODEL_NAMES) {
            val modelFile = this::class.java.getResource("/$modelName.bpmn")?.file
            modelFile?.let {
                val bpmnModelInstance = Bpmn.readModelFromFile(File(it))
                client.deployModel(bpmnModelInstance, modelName)
            }
        }
    }

    fun getChaosModelNames() : List<String> {
        return MODEL_NAMES
    }
}
