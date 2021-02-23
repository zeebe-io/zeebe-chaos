#!/bin/bash

set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source utils.sh
bpmnPath="$scriptPath/../bpmn/"


prev=0
for i in {1..10}
do
 # replace comment to generate new version
 sed -i "s/X_$prev/X_$i/" "$bpmnPath/multiVersionModel.bpmn"
 prev=$i

 # deploy models
 source deploy-model.sh
done

# reset
sed -i "s/X_10/X_0/" "$bpmnPath/multiVersionModel.bpmn"
