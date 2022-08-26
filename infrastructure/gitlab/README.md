[❮ Overview](../../README.md)

<div align="center">
  <h1>
    GitLab
  </h1>
</div>

Stores code repositories and runs CI/CD pipelines.

# 🧬 Structure

## Cloud Resources

- [Account or Group](https://docs.gitlab.com/ee/user/namespace):
  - Project:
    - [Branches](https://docs.gitlab.com/ee/user/project/repository/branches)
      - `main`: Automatically deploys to `staging` environment
        - Allowed to merge: `Developers + Maintainers`
        - Allowed to push: `Maintainers`
        - Allowed to force push: `Yes`
      - `production`: Automatically deploys to `production` environment
        - Allowed to merge: `Maintainers`
        - Allowed to push: `Maintainers`
        - Allowed to force push: `No`
    - [CI/CD](https://docs.gitlab.com/ee/ci/)
      - Configured with environment variables from [.env.example](../../.env.example)

## Code

- `📄 .gitlab-ci.yml`: Defines the [parent pipeline](https://docs.gitlab.com/ee/ci/pipelines/pipeline_architectures.html#child--parent-pipelines) which determines what child pipelines to trigger.
- `📁 infrastructure/`
  - `📁 */`
    - `📄 .gitlab-ci.yml`: Defines a child pipeline to deploy infrastructure as code.
- `📁 apps/`
  - `📁 */`
    - `📄 .gitlab-ci.yml`: Defines a child pipeline to deploy an app.

## Interactions

- [GitLab UI](https://gitlab.com)
- Git Server: Used by developers to push code.
- Deployment pipelines deploy applications and infrastructure.

# 🛰️ Operations

## Monitoring

- [GitLab UI](https://gitlab.com)
  - Project
    - [Analytics -> Value stream](https://docs.gitlab.com/ee/user/analytics)
      - [DORA metrics](https://docs.gitlab.com/ee/user/analytics/#devops-research-and-assessment-dora-key-metrics)
        - Deployment Frequency
