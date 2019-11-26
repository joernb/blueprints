import express from "express";
import helloMiddleware from "./hello";

const app = express();

// compose express app from express middlewares exported by modules
app.use("/", helloMiddleware);

export default app;
