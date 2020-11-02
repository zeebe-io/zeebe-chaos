#!/bin/bash
set -exuo pipefail

scriptPath=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
source $scriptPath/utils.sh

namespace=$(getNamespace)

kubectl delete pods -l app=worker -n $namespace
