import * as fs from "fs";
import * as path from "path";

// Define paths
const decoratorsGoPath = "./decorators/go";
const distSrcPath = "./dist/src";
const indexHtmlPath = path.join(distSrcPath, "index.html");

// Remove script tags from 'index.html'
const indexHtmlContent = fs.readFileSync(indexHtmlPath, "utf-8");
const instantiateJsScriptTag = '<script src="./instantiate.js"></script>';
const wasmExecJsScriptTag = '<script src="./wasm_exec.js"></script>';

const updatedIndexHtmlContent = indexHtmlContent.replace(
  `${instantiateJsScriptTag}\n  ${wasmExecJsScriptTag}\n`,
  ""
);

fs.writeFileSync(indexHtmlPath, updatedIndexHtmlContent);

// Remove copied files
const instantiateJsDistPath = path.join(distSrcPath, "instantiate.js");
const wasmExecJsDistPath = path.join(distSrcPath, "wasm_exec.js");

fs.unlinkSync(instantiateJsDistPath);
fs.unlinkSync(wasmExecJsDistPath);

console.log("Script tags removed and copied files deleted successfully!");
