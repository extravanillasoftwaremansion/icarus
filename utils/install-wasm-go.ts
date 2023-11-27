import * as fs from "fs";
import * as path from "path";

// Define paths
const decoratorsGoPath = "./src/decorators/go";
const distSrcPath = "./dist/src";
const indexHtmlPath = path.join(distSrcPath, "index.html");

// Find and copy 'instantiate.js' and 'wasm_exec.js'
const instantiateJsPath = path.join(decoratorsGoPath, "instantiate.js");
const wasmExecJsPath = path.join(decoratorsGoPath, "wasm_exec.js");

const instantiateJsDistPath = path.join(distSrcPath, "instantiate.js");
const wasmExecJsDistPath = path.join(distSrcPath, "wasm_exec.js");

fs.copyFileSync(instantiateJsPath, instantiateJsDistPath);
fs.copyFileSync(wasmExecJsPath, wasmExecJsDistPath);

// Update 'index.html' with script tags
const indexHtmlContent = fs.readFileSync(indexHtmlPath, "utf-8");
const instantiateJsScriptTag = '<script src="./instantiate.js"></script>';
const wasmExecJsScriptTag = '<script src="./wasm_exec.js"></script>';

const updatedIndexHtmlContent = indexHtmlContent.replace(
  "</head>",
  `  ${instantiateJsScriptTag}\n  ${wasmExecJsScriptTag}\n</head>`
);

fs.writeFileSync(indexHtmlPath, updatedIndexHtmlContent);

console.log("Files copied and 'index.html' updated successfully!");
