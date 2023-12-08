import { Go, JSX, State, Props, Prop } from "../../../decorators/index.js";

@Props(["user"])
export class UserItem {
  @Prop user: { name: string; id: number } | null;
  @State private count: number = 0;

  private increment(el) {
    this.count = this.count + 1;
    el.srcElement.innerText = this.count;
  }

  private renderItems() {
    const userName = this?.user?.name;

    if (userName) {
      return (
        <li
          id="user-item"
          className="user-item"
          style={{
            margin: "10px 0",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          {userName || "Loading..."}
        </li>
      );
    }
  }

  @Go(
    `
    package main

    import (
      "encoding/json"
      "fmt"
      "syscall/js"
    )
    
    type Func struct {
      Name string
      Args []interface{}
    }
    
    type FunctionList []Func
    
    type Result struct {
      Res  string
      Name string
    }
    
    func callFunc(name string, args []interface{}) string {
      ch := make(chan string)
    
      go func() {
        ch <- js.Global().Call(name, args...).String()
      }()
    
      res := <-ch
    
      return res
    }
    
    func callAllFuncs(funcs FunctionList) []interface{} {
      var results []interface{}
    
      for _, s := range funcs {
        res := callFunc(s.Name, s.Args)
        results = append(results, res)
      }
    
      return results
    }
    
    func JSON2FunctionList(args []js.Value) FunctionList {
      a := args[0].String()
    
      var funcs FunctionList
    
      err := json.Unmarshal([]byte(a), &funcs)
      if err != nil {
        fmt.Println(err.Error())
      }
    
      return funcs
    }
    
    func consec(this js.Value, args []js.Value) interface{} {
      funcs := JSON2FunctionList(args)
      return callAllFuncs(funcs)
    }
    
    func main() {
      js.Global().Set("consec", js.FuncOf(consec))
      <-make(chan bool)
    }
  `
  )
  private _runJSFuncsInGolang() {
    function goodbye() {
      return "bye dude!";
    }

    function cool() {
      return "cool";
    }

    function add(x, y) {
      return x + y;
    }

    const funcs = [
      { name: "goodbye" },
      { name: "cool" },
      { name: "add", args: [1, 2] },
    ];

    //@ts-ignore
    const res = consec(JSON.stringify(funcs));

    console.log(res);
  }

  private onClick(el: any) {
    this.increment(el);
    this._runJSFuncsInGolang();
  }

  render() {
    return (
      <div>
        {this.renderItems()}

        <button id="incrementButton" onclick={(el) => this.onClick(el)}>
          {String(this.count)}
        </button>
      </div>
    );
  }
}

export default UserItem;
