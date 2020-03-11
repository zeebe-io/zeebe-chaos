#!/bin/bash

namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')
pod=$(kubectl get pod -l app=$namespace-zeebe -o jsonpath="{.items[0].metadata.name}")

for i in {0..10}
do
  kubectl exec $pod -- zbctl --insecure create instance benchmark --withResult
done
