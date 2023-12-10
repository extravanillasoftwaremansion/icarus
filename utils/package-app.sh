#!/bin/bash

if [ -d "dist/src" ]; then
  # Remove the 'dist' folder and its contents
  rm -r dist/src
  rm -r dist/node_modules
fi

mkdir dist/src
mkdir dist/node_modules

# Move all files from /src to /dist/src
cp -r src/* dist/src
cp -4 node_modules dist/node_modules
cp -r package.json dist/src

cd dist/src
tsc          