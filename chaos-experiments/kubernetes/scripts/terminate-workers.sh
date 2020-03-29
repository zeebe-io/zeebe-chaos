#!/bin/bash
set -exuo pipefail

namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')

kubectl delete pods -l app=worker -n $namespace
