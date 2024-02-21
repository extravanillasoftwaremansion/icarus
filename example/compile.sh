#!/bin/bash

# Directory containing JavaScript files
js_dir="./public"

# Check if the directory exists
if [ ! -d "$js_dir" ]; then
    echo "Error: Directory '$js_dir' not found."
    exit 1
fi

tsc
echo "TypeScript files compiled to dist"

npm run transpile
echo "JavaScript files transpiled in dist"

# Delete JavaScript files from the directory
echo "Deleting JavaScript files from $js_dir ..."
find "$js_dir" -type f -name '*.js' ! -name 'main.js' -delete

echo "JavaScript files deleted successfully."
