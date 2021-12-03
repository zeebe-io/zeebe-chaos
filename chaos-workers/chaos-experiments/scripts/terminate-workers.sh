#!/bin/bash
set -exuo pipefail

source utils.sh

namespace=$(getNamespace)

kubectl delete pods -l app=worker -n "$namespace"
