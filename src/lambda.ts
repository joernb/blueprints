import { Context } from "aws-lambda";
import * as awsServerlessExpress from "aws-serverless-express";
import app from ".";

const server = awsServerlessExpress.createServer(app);

export default (event: any, context: Context) => {
  awsServerlessExpress.proxy(server, event, context);
};
