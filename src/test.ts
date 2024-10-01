import { WebServer, Middleware, Route } from "./server";

@WebServer({ port: 3000 })
class UserAPI {
  @Route("GET", "/users")
  @Middleware((req, res) => {
    res.setHeader("Content-Type", "application/json");
  })
  getUsers(req, res) {
    res.end(JSON.stringify([{ id: 1, name: "John Doe" }]));
  }

  @Route("POST", "/users")
  createUser(req, res) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      res.end(body);
    });
  }
}

const server = new UserAPI();
export default server;
