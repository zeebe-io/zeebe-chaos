#!/usr/bin/env bash
cd $HOME/Develop/zeebe/zeebe-performance-tests/src/
echo "starting single-threded test"
ts-node start.ts
echo "Single-threaded test finished."
cd -
