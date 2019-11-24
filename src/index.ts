import express from "express";
import helloMiddleware from "./hello";

const app = express();
const port = process.env.PORT || 3000;

// compose express app from express middlewares exported by modules
app.use("/", helloMiddleware);

// start app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
