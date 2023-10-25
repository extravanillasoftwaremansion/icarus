#!/bin/bash

# Clean the existing 'dist' folder
rm -rf dist

# Create the 'dist' folder if it doesn't exist
mkdir -p dist

# Copy all files and folders from 'src' to 'dist'
cp -r src/. dist

# Remove all .ts files from the 'dist' folder
find dist -name "*.ts" -type f -delete