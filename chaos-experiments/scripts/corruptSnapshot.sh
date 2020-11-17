#!/bin/bash 
set -exo pipefail

partition=$1

# Find the latest snapshot directory
partitionDir="data/raft-partition/partitions/$partition"
snapshotDir=( "$partitionDir"/snapshots/*-*-* )

# Remove a random *.sst file
fileName=$(find "${snapshotDir[0]}" -name "*.sst" -print -quit)

rm "$fileName"
