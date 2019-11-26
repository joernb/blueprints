import * as path from "path";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigateway";

export class Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "MyLambdaFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.default", // index.js export default value
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "dist")),
    });

    const api = new apiGateway.RestApi(this, "MyApiGatewayFunction", {
      restApiName: "My Rest Api Name",
      description: "Rest Api Description",
    });

    const lambdaIntegration = new apiGateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    });

    api.root.addMethod("GET", lambdaIntegration); // GET /
  }
}
