# Description

The chaos-workers are register for a specific job-type and run chaos experiments against a specific cluster plan.

The docker image:
 
  * bases on a java image
  * installs kubectl, chaos toolkit, git and other dependencies to run chaos experiments
  * needs access to the gke cluster via a service account token
  * starts a zeebe job worker via zbctl on running the image 
  
On building the docker image a service account token needs to be given, which is used to access the different gke cluster.
When running the image a zeebe job worker is started, as environment variables the auth details to the testbench have to been set.

The job worker runs a job handler script. This handler extracts from the given variables all necessary informations like auth details of the targeting cluster but also which cluster plan is it.
Depending on the cluster plan different chaos experiments are executed. The job is completed with a `testReport`.

The report contains a result which is either `PASSED`, `FAILED` or `SKIPPED`.

 * `PASSED` means that all chaos experiment's have been completed successfully. In the metadata of the test report the experiments are listed, which have been executed.
 * `FAILED` means that **one** experiment has failed. In the metadata of the test report the experiments are listed, which have been executed. Which experiment has failed can be found in the failure messages.
 * `SKIPPED` means that no experiments have been found and that the execution has been skipped
 
## Chaos Worker

The chaos worker is written in bash and uses `zbctl` to register for a specific job type. [shellcheck](https://github.com/koalaman/shellcheck) is used in the CI to check the scripts.
This is to make sure that we keep a specific quality and avoid unnecessary bugs in the scripts. The handler code is tested via unit tests, for that we use testing framework called [bats](https://github.com/bats-core/bats-core).
If you want to run the unit tests locally make sure to follow the [installation guide](https://github.com/bats-core/bats-core#installation). 
