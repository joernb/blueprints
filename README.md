<div align="center">
  <h1>
    <div>🗺️</div>
    Blueprint
  </h1>
</div>

This readme gives developers an overview over the system architecture and the development and operations workflows. It documents a full circle DevOps approach that encourages cross-functional collaboration and fast flow of change.

# 🧬 Structure

## Principles

- The tech stack is centered around full stack JavaScript solutions.
- This Monorepo is based on [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) which means it contains an npm root package and multiple child packages.
- Child packages are kept in different directories (infrastructure, apps, libs) based on their architectural role (inspired by [Nx's approach](https://nx.dev/structure/applications-and-libraries)).
- A child package can reference other child packages within the Monorepo as a code dependency to access its code.
- [Lerna](https://github.com/lerna/lerna) is used to run npm scripts across all packages. It determines the execution order of scripts (e.g. deployment scripts) based on the dependency topology.
- Configuration values are [stored in environment variables](https://12factor.net/config) and are not versioned. They are passed in via a local `.env` file or by specifying environment variables in the CI/CD runtime.
- Staging and production infrastructure environments are [kept similar](https://12factor.net/dev-prod-parity).

## Overview

```mermaid
graph LR

```

## infrastructure/

Infrastructure contains the setup for cloud-based environments and services and is required to deploy and operate applications. The setup is described through documentation or through infrastructure as code solutions.

## apps/

Applications are executables that are deployed to and operated on infrastructure. They use internal and external libraries as code dependencies. Applications are configured through environment variables that are passed in at runtime or compiled into the application at compile time.

## libs/

Libraries are used as code dependencies by applications or other libraries. They typically implement specific functionality (e.g. utility functions, user interface components) or the network interaction between applications on the client side as a "client library" or the server side as an "api library". Libraries can be published to make them available for external applications outside the Monorepo. Libraries can define their own build process or just provide source files that are compiled by the build process of the consuming application. Libraries should not read environment variables but receive their configuration from the application through some kind of initialization.

# 🚀 Development

## Principles

- [Trunk Based Development](https://trunkbaseddevelopment.com) is used.
- The `main` branch is the trunk and contains the latest version of the software that should be deployable to production at all times.
- Changes to `main` automatically trigger a deployment to the staging environment.
- Production deployments are triggered by merging the `main` branch into the `production` branch.
- Changes are developed in short-living feature branches that are based on and merged back into `main`.
- Both `main` and `production` should only contain commits with deployable versions of the software so that each commit actually represents a past deployment and rollbacks can be done by deploying any previous commit. Therefore, commits should always be squashed when merged to keep intermediate states out of the history.
- `production` should never be changed manually and never backmerged into `main`. Emergency hotfixing can be done by cherry-picking changes from `main` into `production`.
- Feature branches should be short-living to accelerate lead time and to receive early feedback. It is better to integrate even unfinished changes in a disabled state (e.g. commented out) than to delay integration and risk complex merge conflicts.

## Setup

How to set up a local development environment:

- Install [Node.js](https://nodejs.org)
- Install dependencies:
  ```sh
  npm install
  ```
- Copy [`.env.example`](./.env.example) to `.env` and set up local environment variables:
  ```sh
  cp .env.example .env
  ```

## Develop

How to develop and debug changes locally:

- Start local development servers:
  ```sh
  npm run dev
  ```

## Build

How to create a local production build:

- To create a production build, run:
  ```sh
  npm run build
  ```
- To start the production build locally using `.env` environment variables:
  ```sh
  npm start
  ```

## Test

How to run automated tests locally:

- Run tests:
  ```sh
  npm run test
  ```
- Run linting:
  ```sh
  npm run lint
  ```

## Integrate into staging

How to develop changes and integrate them:

- Create a feature branch `feature/...` based on `main`
- Commit changes
- Rebase onto `main` to receive latest changes
- Create a pull/merge request `feature/... -> main`
- Ask for a review and await approval
- Squash, merge and close the request
- Check `staging` environment deployment pipeline

## Release to production

How to create a production release:

- Create a pull/merge request `main -> production`
  - For emergency hotfixes: Create the pull/merge request by cherry-picking just the specific commit with the emergency changes from `main`
- Ask for a review and await approval
- Squash, merge and close the request
- Check `production` environment deployment pipeline

## Recurring maintenance

Things to do on a regular basis:

- Upgrade vulnerable package dependencies to receive latest security updates:
  ```sh
  npm audit
  npm audit fix
  ```

# 🛰️ Operations

## Principles

- Establish observability by collecting and processing [telemetry data](https://opentelemetry.io/docs/concepts/observability-primer).
- Define alerting conditions that require human intervention.
- Schedule on-call shifts for responders and set up a notification system to alert them.
- Document diagnosis and mitigation procedures in runbooks.
- Learn from failures by doing [postmortems](https://sre.google/workbook/postmortem-culture).

## Monitoring

## Alerting

## Incident Response

- Assess and document the impact and severity of the incident.
- Use [runbooks/](runbooks/) to diagnose and resolve the incident.
- Identify follow-up improvements (e.g. development tasks, runbook improvements).
