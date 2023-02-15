const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const { HttpsProxyAgent } = require("https-proxy-agent");

const agent = new HttpsProxyAgent("http://127.0.0.1:8118");

const app = express();

const PORT = 3002;
const HOST = "localhost";
const API_SERVICE_JSONPLACEHOLDER = "https://jsonplaceholder.typicode.com";
const API_SERVICE_PIXABAY = "https://pixabay.com/api";
const API_SERVICE_UNSPLASH = "https://source.unsplash.com/random";

app.use(cors());

app.use(morgan("dev"));

app.use(
  "/json_placeholder",
  createProxyMiddleware({
    target: API_SERVICE_JSONPLACEHOLDER,
    changeOrigin: true,
    agent,
    pathRewrite: {
      [`^/json_placeholder`]: "",
    },
  })
);

app.use(
  "/unsplash",
  createProxyMiddleware({
    target: API_SERVICE_UNSPLASH,
    changeOrigin: true,
    agent,
    pathRewrite: {
      [`/unsplash`]: "",
    },
  })
);

app.use(
  "/pixabay",
  createProxyMiddleware({
    target: API_SERVICE_PIXABAY,
    changeOrigin: true,
    agent,
    pathRewrite: {
      [`/pixabay`]: "",
    },
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
