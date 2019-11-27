import * as path from "path";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";

export class Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "MyLambdaFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "lambda.default", // lambda.js export default value
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "dist")),
    });
    new apiGateway.LambdaRestApi(this, "MyLambdaRestApi", {
      handler,
    });
    // Set environment variables starting with LAMBDA_
    Object.keys(process.env)
      .filter(key => key.indexOf("LAMBDA_") === 0)
      .forEach(key => handler.addEnvironment(key, process.env[key] || ""));
  }
}
