import http from "http";

export function WebServer(config) {
  return function (target) {
    const server = http.createServer((req, res) => {
      const { method, url } = req;
      const routeKey = `${method} ${url}`;

      if (target.routes[routeKey]) {
        const { handler, middlewares } = target.routes[routeKey];

        // Apply middlewares if any
        middlewares.forEach((middleware) => middleware(req, res));

        // Call the route handler
        handler(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    });

    server.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}/`);
    });

    target.server = server;
  };
}

export function Route(method, path) {
  return function (target, propertyKey, descriptor) {
    if (!target.constructor.routes) {
      target.constructor.routes = {};
    }
    target.constructor.routes[`${method.toUpperCase()} ${path}`] = {
      handler: descriptor.value,
      middlewares: [],
    };
  };
}

export function Middleware(middlewareFunc) {
  return function (target, propertyKey) {
    const route =
      target.constructor.routes[`${target.httpMethod} ${target.path}`];
    if (route) {
      route.middlewares.push(middlewareFunc);
    }
  };
}
