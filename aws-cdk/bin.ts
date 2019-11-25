import * as cdk from "@aws-cdk/core";
import { Stack } from "./stack";

if (!process.env.AWS_CDK_STACK_ID) {
  throw Error("Missing environment variable AWS_CDK_STACK_ID");
}

const app = new cdk.App();
new Stack(app, process.env.AWS_CDK_STACK_ID);
