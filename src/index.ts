import express from "express";
import cors from "cors";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import helloMiddleware from "./hello";

const app = express();

// integrate middleware to bridge AWS serverless events to express middlewares
app.use(awsServerlessExpressMiddleware.eventContext());

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
