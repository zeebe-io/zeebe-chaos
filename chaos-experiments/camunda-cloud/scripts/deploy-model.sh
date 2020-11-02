#!/bin/bash

set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)
pod=$(getGateway)

processFileName=one_task.bpmn
bpmnPath=$scriptPath/../../bpmn/$processFileName

kubectl cp $bpmnPath $pod:/tmp/$processFileName -n $namespace

deployModel() {
 kubectl exec $pod -n $namespace -- zbctl deploy /tmp/$processFileName --insecure
}

while ! deployModel ;
do
  true;
done
