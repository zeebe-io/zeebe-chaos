#!/bin/bash
set -xo pipefail

if [ -z $1 ]
then
  echo "Please provide number of instances!"
  exit 1
fi

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

maxIterations=$1

namespace=$(getNamespace)
pod=$(getGateway)

. $scriptPath/deploy-model.sh

COUNTER=0

until [[ $COUNTER -gt maxIterations ]]; do
  kubectl exec $pod -n $namespace -- zbctl create instance benchmark --insecure &>/dev/null &
  
  let COUNTER=COUNTER+1 
done

