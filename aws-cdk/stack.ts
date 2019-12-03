import * as path from "path";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";

export class Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "LambdaFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      // TODO configure name of file and exported handler function
      handler: "index.default", // index.js export default value
      // TODO configure build output folder
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "dist")),
    });
    new apiGateway.LambdaRestApi(this, "LambdaRestApi", {
      handler,
    });

    // Deploy environment variables, that are needed at runtime
    if (process.env.AWS_LAMBDA_RUNTIME_ENV_VARS) {
      process.env.AWS_LAMBDA_RUNTIME_ENV_VARS.split(",").forEach(name =>
        process.env[name]
          ? handler.addEnvironment(name, process.env[name] as string)
          : undefined
      );
    }
  }
}
