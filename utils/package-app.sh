#!/bin/bash

if [ -d "dist" ]; then
  # Remove the 'dist' folder and its contents
  rm -r dist
fi

# Create the 'dist/src' directory if it doesn't exist
mkdir -p dist/src

# Move all files from /src to /dist/src
cp -r src/* dist/src

cd dist/src
tsc          

# Remove all .ts files from the 'dist' folder
find -name "*.ts" -type f -delete
find -name "*.tsx" -type f -delete