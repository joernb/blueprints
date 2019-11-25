# AWS Deployment

The AWS CDK (Cloud Development Kit) allows to programmatically define AWS stacks by instantiating TypeScript classes.
Internally this is converted to a CloudFormation stack, which is then deployed to AWS.

## Bootstrapping

CDK requires the AWS environment to be bootstrapped with a ["toolkit stack"](https://docs.aws.amazon.com/de_de/cdk/latest/guide/tools.html) in order to use CDK.

Make sure to run `cdk bootstrap` to bootstrap the deployment environment.

## Deploying a stack

- The developer or the CI calls `cdk deploy`, which runs the command specified in `cdk.json`
- Usually `cdk.json` executes a TypeScript `bin` file, which instantiates a CDK Stack class
- The stack class constructor uses the TypeScript wrapper classes to create an AWS stack
- The internally generated CloudFormation stack is then deployed to AWS

## Investigate stack differences

`cdk diff` shows the difference between the locally generated stack and the currently deployed stack.

## Removing a deployed stack

To destroy a stack and delete everything, call `cdk destroy`. You have been warned!
