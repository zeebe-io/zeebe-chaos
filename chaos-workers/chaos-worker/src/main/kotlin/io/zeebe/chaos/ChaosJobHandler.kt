package io.zeebe.chaos

import io.camunda.zeebe.client.ZeebeClient
import io.camunda.zeebe.client.api.response.ActivatedJob
import io.camunda.zeebe.client.api.worker.JobHandler

/**
 * Extension of the JobHandler interface, to return the job type as string.
 */
interface ChaosJobHandler : JobHandler {
    fun getJobType() : String
}

/**
 * Factory, which provides the client to access the cluster where the chaos experiment
 * should run against.
 *
 * @param job the job payload contains relevant details to create the Zeebe Client
 * @return the client to access the cluster where the chaos experiment should run against
 */
typealias ChaosClusterClientFactory = (job: ActivatedJob) -> ZeebeClient

/**
 * Typealias/function to register an job, which the JobHandler currently handles.
 */
typealias RegisterJob = (job: ActivatedJob) -> Unit
