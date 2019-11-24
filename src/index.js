const express = require("express");
const helloMiddleware = require("./hello");

const app = express();
const port = process.env.PORT || 3000;

// compose express app from express middlewares exported by modules
app.use("/", helloMiddleware);

// start app
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
