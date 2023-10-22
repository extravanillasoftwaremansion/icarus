#!/bin/bash

# Clean the existing 'dist' folder
rm -rf dist

# Create the 'dist' folder if it doesn't exist
mkdir -p dist

# Copy all files and folders from 'src' to 'dist'
cp -r src/. dist

# Copy the 'tsconfig.json' to the 'dist' folder
cp tsconfig.json dist/tsconfig.json

# Run 'npx tsc' on the 'dist' folder (compiles TypeScript to JavaScript)
npx tsc --project dist/tsconfig.json

# Remove all .ts files from the 'dist' folder
find dist -name "*.ts" -type f -delete

# Remove the 'tsconfig.json' from the 'dist' folder
rm dist/tsconfig.json
