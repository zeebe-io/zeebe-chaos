#!/bin/bash

source ~/.venvs/chaostk/bin/activate

export CHAOS_SETUP="helm"
export NAMESPACE=$(kubens -c)
export PATH="$PATH:$(pwd)/../scripts/"
