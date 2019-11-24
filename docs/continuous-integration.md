# Continuous Integration

Inspired by [Trunk Based Development](https://trunkbaseddevelopment.com).

There are two environments:

- staging
- production

## master branch (deployed to staging)

- The `master` branch contains a stable version of the code and is the base for other branches
- Changes to `master` will be automatically deployed to the staging environment
- The master branch should be configured as a protected branch to prevent changes from bypassing quality checks

<!-- TODO protect master branch from pushing -->

## Feature branches

- Short-lived branches based on `master` can be used to develop features
- To merge something back into `master`, open a merge request / pull request
- Merge requests / pull requests trigger manual and automatic quality checks including:
  - automatic tests
  - static analysis / linting
  - code review by another developer (by opening comments, giving thumbs up)

<!-- TODO configure pull / merge request code review settings in the source control provider ui -->

## release tag (deployed to production)

- Deploying a new release to production is done by creating a release tag
- A name scheme regex for that is `/^release.*$/` (e.g. matches `release`, `release-1.0`, `release-latest`)
- Release tags are automatically deployed to the production environment
- Triggering a production deployment can also be automated by creating and pushing the release tag

<!-- TODO protect release tags -->
