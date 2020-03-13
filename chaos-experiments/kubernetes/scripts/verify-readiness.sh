#!/bin/bash
set -exo pipefail

namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')
# verify that everything is running
kubectl wait --for=condition=Ready pod -l app=$namespace-zeebe --timeout=900s
