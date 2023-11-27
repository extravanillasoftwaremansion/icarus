// main.ts
import { Go } from "./index";

class MyClass {
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
  async myMethod() {
    //@ts-ignore
    consec();
  }
}

const myInstance = new MyClass();
myInstance.myMethod();
