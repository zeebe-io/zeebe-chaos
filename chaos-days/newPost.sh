#!/bin/bash

set -euxo pipefail

title="$@"
cleanTitle=$(echo $title | sed -e 's/ /-/g')
currentDate=$(date +%Y-%m-%d)

blogname="$currentDate-$cleanTitle"

blogdir="blog/$blogname"
file="$blogdir/index.md"

if [ -d "$blogdir" ]
then
  echo "Blog dir $blogdir already exists."
else
  mkdir "$blogdir"
fi

cp templates/YYYY-MM-DD-template.md "$file"

sed -i "s/YYYY-MM-DD/$currentDate/g" "$file"
sed -i "s/TITLE/$title/g" "$file"
