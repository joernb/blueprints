# AWS Lambda

## Deployment

Lambda functions need to be deployed together with their dependencies. The `node_modules` folder must be part of the deployment. This can be done like this:

- Build the lambda function handler code
- Copy the package.json to the build folder
- Install dependencies with `yarn install --production` which will omit devDependencies
