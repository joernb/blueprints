const express = require("express");
const helloMiddleware = require("./hello");

const app = express();

// compose express app from express middlewares exported by modules
app.use("/", helloMiddleware);

module.exports = app;
