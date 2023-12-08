#!/bin/bash

# Define the path to the dist/gowasm directory
distGowasmPath="./dist/gowasm"

# Check if the directory exists before removing it
if [ -d "$distGowasmPath" ]; then
  rm -r "$distGowasmPath"
  echo "Removed $distGowasmPath"
else
  echo "$distGowasmPath does not exist."
fi
