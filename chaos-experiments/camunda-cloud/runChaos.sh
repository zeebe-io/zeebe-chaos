#!/bin/bash

source ~/.venvs/chaostk/bin/activate
export NAMESPACE=$(kubens -c)
export PATH="$PATH:$(pwd)/../scripts/"
