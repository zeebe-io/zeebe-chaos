#!/bin/bash


function getNamespace()
{
 namespace=$(kubectl config view --minify --output 'jsonpath={..namespace}')
 echo $namespace
}


function getBroker()
{
  namespace=$(getNamespace)
  pod=$(kubectl get pod -n $namespace -l app=$namespace-zeebe -o jsonpath="{.items[0].metadata.name}")

  echo $pod
}

function getGateway()
{
  namespace=$(getNamespace)
  pod=$(kubectl get pod -n $namespace -l app=$namespace-zeebe-gateway -o jsonpath="{.items[0].metadata.name}")

  echo $pod
}

