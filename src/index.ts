import express from "express";
import cors from "cors";
import helloMiddleware from "./hello";

const app = express();

// enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [],
    optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204 but work with 200
  })
);

// compose express app from express middlewares exported by modules
app.use("/", helloMiddleware);

export default app;
