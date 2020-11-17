#!/bin/bash

maxIterations=$1
COUNTER=0
until [[ "$COUNTER" -gt "$maxIterations" ]]; do
  zbctl create instance benchmark --insecure &>/dev/null &
  (( COUNTER=COUNTER+1 ));
done
