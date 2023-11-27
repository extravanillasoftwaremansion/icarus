function goodbye() {
  return "bye dude!";
}

function cool() {
  return "cool";
}

function add(x, y) {
  return x + y;
}

function runGolang() {
  const funcs = [
    { name: "goodbye" },
    { name: "cool" },
    { name: "add", args: [1, 2] },
  ];

  //@ts-ignore
  const res = consec(JSON.stringify(funcs));
  console.log(res);
}

export function run() {
  runGolang();
}
