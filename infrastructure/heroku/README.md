[❮ Overview](../../README.md)

<div align="center">
  <h1>
    Heroku
  </h1>
</div>

Heroku is a cloud platform for deploying and operating apps.

# 🧬 Structure

## Cloud Resources

- Account
  - API Key: `HEROKU_API_KEY`
  - Apps `next-app-staging` / `next-app-production`: Isolated runtime environments. Apps run on one or more containers called [dynos](https://www.heroku.com/dynos). One dyno is called `web` and publicly accessible via a HTTPS URL (with [SSL](https://devcenter.heroku.com/articles/ssl)).
    - App Name: `HEROKU_APP_NAME`
    - Buildpacks:
      - `heroku/nodejs`
    - Config Vars:
      - Should contain all environment variables (except `PORT`)
      - `LERNA_FLAGS="--scope @my-org/next-app --include-dependencies"`: This will scope the monorepo commands like `npm run build`.
    - [Git Remote](https://devcenter.heroku.com/articles/git): Each app has a dedicated Git remote for deployment. Pushing commits to this remote will trigger a build (`npm run build`) and start (`npm start` with `PORT` environment variable set by Heroku).

## Interactions

- [Dashboard](https://dashboard.heroku.com): Manage Heroku Apps.
- Git Server: Pushing to the Git server automatically triggers a build and deployment.

# 🛰️ Operations

## Monitoring

- [More -> View logs](https://devcenter.heroku.com/articles/logging#view-logs-with-the-heroku-dashboard): Show application logs
