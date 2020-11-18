#!/usr/bin/env bats

source utils.sh

COUNT=0
function failUntil() {

 endCount="$1"
 COUNT=$(( COUNT + 1 ))
 if [ "$endCount" -eq "$COUNT" ]
 then
   return 0
 fi

 return 1
}

@test "retry function until succeed" {
  # given
  expectedCount=3

  # when
  retryUntilSuccess failUntil "$expectedCount"

  # then
  echo "expected: $expectedCount"
  echo "actual: $COUNT"

  [ "$COUNT" -eq "$expectedCount" ]  
}
