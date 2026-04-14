#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${SKIP_SUBMODULE_UPDATE:-}" ]; then
  git submodule update --init --recursive
fi

# dark
(cd dark && npm install && npm run build)
rm -rf shell-stubs/dark
mkdir -p shell-stubs/dark
cp -R dark/dist/. shell-stubs/dark/
touch shell-stubs/dark/.gitkeep

# dog tracker
(cd "dog tracker" && npm install && npm run build)
rm -rf shell-stubs/dog-tracker
mkdir -p shell-stubs/dog-tracker
cp -R "dog tracker/dist/." shell-stubs/dog-tracker/
touch shell-stubs/dog-tracker/.gitkeep

# magazyn-patryka
(cd magazyn-patryka && npm install --legacy-peer-deps && MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*' PUBLIC_URL=/shell-stubs/magazyn-patryka npm run build)
rm -rf shell-stubs/magazyn-patryka
mkdir -p shell-stubs/magazyn-patryka
cp -R magazyn-patryka/build/. shell-stubs/magazyn-patryka/
touch shell-stubs/magazyn-patryka/.gitkeep

# assemble dist/
rm -rf dist
mkdir -p dist
cp shell/index.html shell/main.js shell/styles.css dist/
cp -R shell-stubs dist/shell-stubs

echo "Built: dark, dog-tracker, magazyn-patryka"
