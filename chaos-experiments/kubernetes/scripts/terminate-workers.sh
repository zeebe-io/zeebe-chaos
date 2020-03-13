#!/bin/bash
set -exuo pipefail

kubectl delete pods -l app=worker
