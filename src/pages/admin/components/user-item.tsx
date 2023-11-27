import { Props, Prop } from "../../../decorators/prop/index.js";
import { State } from "../../../decorators/state/index.js";
import { JSX } from "../../../decorators/jsx/index.js";
import { Go } from "../../../decorators/index.js";
import { run } from "./functions";

@Props(["user"])
export class UserItem {
  @Prop user: { name: string; id: number } | null;
  @State private count: number = 0;

  increment(el) {
    this.count = this.count + 1;
    el.srcElement.innerText = this.count;
  }

  renderItems() {
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
  runJSInGO() {
    run();
  }

  onClick(el: any) {
    this.increment(el);
    this.runJSInGO();
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
