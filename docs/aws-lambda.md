# AWS Lambda

## Dependencies

Lambda functions need to be deployed together with their dependencies. The `node_modules` folder must be part of the deployment. This can be done like this:

- Build the lambda function handler code
- Copy the package.json to the build folder
- Install dependencies with `yarn install --production` which will omit devDependencies

## Environment Variables

The Environment variables visible to a lambda function can be changed through the AWS UI after deployment. However, to have a fully automated deployment pipeline, the environment variable values need to be known at deploy time, so that they can be deployed with the lambda function.
