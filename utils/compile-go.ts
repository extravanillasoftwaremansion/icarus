import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import { execSync } from "child_process";

function visit(node) {
  if (ts.isDecorator(node) && ts.isCallExpression(node.expression)) {
    //@ts-ignore
    const decoratorName = node.expression.expression.escapedText;

    if (decoratorName === "Go") {
      //@ts-ignore
      const goCode = node.expression.arguments[0].text;
      const fileName = `main-${Date.now()}`;

      // Create a temporary directory for Go module
      const tempDir = `./temp-${fileName}`;
      fs.mkdirSync(tempDir);

      // Write the Go code to a temporary Go file
      const tempGoFile = path.join(tempDir, "main.go");
      fs.writeFileSync(tempGoFile, goCode);

      // Initialize a Go module
      console.log("initializing go module");
      execSync("go mod init mymodule", {
        cwd: tempDir,
        stdio: "inherit",
      });

      // Compile the Go code
      console.log("compiling go code");
      execSync(`GOOS=js GOARCH=wasm go build -o main.wasm`, {
        cwd: tempDir,
        stdio: "inherit",
      });

      // Move the compiled Go file to the dist directory
      const distDir = "./dist";
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
      }

      const distFilePath = path.join(distDir, "gowasm");
      fs.renameSync(tempDir, distFilePath);

      // Clean up the temporary directory
      // fs.rmdirSync(tempDir, { recursive: true });

      console.log(`Compiled Go code for ${fileName}`);
    }
  }

  ts.forEachChild(node, visit);
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest
  );

  visit(sourceFile);
}

function traverseFiles(directory) {
  const files = fs.readdirSync(directory);
  files.forEach(async (file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      traverseFiles(filePath);
    } else if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
      processFile(filePath);
    }
  });
}

// Provide the root directory containing your TypeScript files
const rootDirectory = "./src";
traverseFiles(rootDirectory);
