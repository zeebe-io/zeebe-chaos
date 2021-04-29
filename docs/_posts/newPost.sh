#!/bin/bash

set -euxo pipefail

title="$@"
cleanTitle=${title/ /-}
currentDate=$(date +%Y-%m-%d)

filename="$currentDate-$cleanTitle".md

cp templates/YYYY-MM-DD-template.md ./"$filename"

sed -i "s/YYYY-MM-DD/$currentDate/g" "$filename"
sed -i "s/TITLE/$title/g" "$filename"
