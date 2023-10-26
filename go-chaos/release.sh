#!/usr/bin/env bash

set -euo pipefail

if ! command -v gh &> /dev/null
then
    echo "gh (github cli) could not be found"
    echo "Please make sure to install it before."
    echo "Check: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    exit 1
fi


echo "Nice, you want to release a new version of zbchaos."
echo "Checking out main and retrieving most recent tags"
git checkout main
git fetch --all
git pull origin main

lastRelease=$(git tag | sort -Vr | head -n1)

echo "Last release was: $lastRelease"
read -p "Please type a new release here: " newRelease
export RELEASE_VERSION="$newRelease"

echo "Build the zbchaos artifacts"
./build.sh

echo "Create a tag and push it to the remote"
git tag "$RELEASE_VERSION"
git push origin "$RELEASE_VERSION"

echo "Create a github release with the tag and artifacts"
gh release create "$RELEASE_VERSION" --generate-notes ./dist/*


