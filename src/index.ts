import express from "express";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import helloMiddleware from "./hello";

const app = express();

// integrate middleware to bridge AWS serverless events to express middlewares
app.use(awsServerlessExpressMiddleware.eventContext());

// compose express app from express middlewares exported by modules
app.use("/", helloMiddleware);

export default app;
