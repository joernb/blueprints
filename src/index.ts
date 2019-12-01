import express from "express";
import cors from "cors";
import helloMiddleware from "./hello";

const app = express();

// enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus:
      parseInt(process.env.CORS_OPTIONS_SUCCESS_STATUS || "", 10) || undefined,
  })
);

// compose express app from express middlewares exported by modules
app.use("/", helloMiddleware);

export default app;
