#!/usr/bin/env bash

set -eo pipefail

if ! command -v gh &> /dev/null
then
    echo "gh (github cli) could not be found"
    echo "Please make sure to install it before."
    echo "Check: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    exit 1
fi

if [[ -z "$1" ]]
then
  echo "Nice, you want to release a new version of zbchaos."
  echo "Checking out main and retrieving most recent tags"
  git checkout main
  git fetch --all
  git pull origin main

  lastRelease=$(git tag | sort -Vr | head -n1)

  echo "Last release was: $lastRelease"
  read -p "Please type a new release here: " newRelease
  export RELEASE_VERSION="$newRelease"
else
export RELEASE_VERSION="$1"
fi

echo "Build the zbchaos artifacts for version $RELEASE_VERSION"
./build.sh

#  * Per default set to latest, right now everything is latest
#  * Automatically generate notes based on PR's
#  * Dist folder will be uploaded and attached to the release
#  * Tag will be automatically created
echo "Create a github release (for $RELEASE_VERSION) with the tag and artifacts"
gh release create "$RELEASE_VERSION" --generate-notes ./dist/*

dockerImage="gcr.io/zeebe-io/zbchaos"
echo "Building docker image $dockerImage:$RELEASE_VERSION"
docker build -t "$dockerImage:$RELEASE_VERSION" .
docker push "$dockerImage:$RELEASE_VERSION"

echo "Update deployment.yaml"
sed -i "s/TAG/$RELEASE_VERSION/g" deploy/deployment.yaml

echo "Deploy zbchaos deployment to testbench"
kubectl -n testbench-1-x-prod apply -f deploy/deployment.yaml
