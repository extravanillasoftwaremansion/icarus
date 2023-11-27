const go = new Go();

WebAssembly.instantiateStreaming(
  fetch("./gowasm/main.wasm"),
  go.importObject
).then((result) => {
  go.run(result.instance);
});
