const fs = require("fs");

const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const { HttpsProxyAgent } = require("https-proxy-agent");

// TOR http proxy exposed on port = 8118 on localhost
const agent = new HttpsProxyAgent("http://127.0.0.1:8118");

const app = express();

const PORT = 3002;
const HOST = "localhost";

app.use(cors());

app.use(morgan("dev"));

fs.readFile("routes.json", { encoding: "utf8" }, (error, data) => {
  if (error) {
    console.log(error);
  }

  let routes;
  routes = JSON.parse(data);
  setupRoutes(routes);

  app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
  });
});

function setupRoutes(routes) {
  Object.keys(routes).forEach((routeKey) => {
    console.log(routeKey);
    app.use(
      routeKey,
      createProxyMiddleware({
        target: routes[routeKey].api_url,
        changeOrigin: true,
        agent,
        pathRewrite: {
          [`${routeKey}`]: "",
        },
      })
    );
  });
}
