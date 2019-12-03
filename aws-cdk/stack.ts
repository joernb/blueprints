import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";

export class Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      // TODO configure build output folder
      sources: [s3deploy.Source.asset("./public")],
      destinationBucket: websiteBucket,
    });
  }
}
