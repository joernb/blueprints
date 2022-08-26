[❮ Overview](../../README.md)

<div align="center">
  <h1>
    Vercel
  </h1>
</div>

Cloud platform for deploying and operating web apps.

# 🧬 Structure

## Cloud Resources

- [Account](https://vercel.com/docs/concepts/personal-accounts/overview): Personal account, can be added to a [team](https://vercel.com/docs/concepts/teams/overview).
  - Your ID: `VERCEL_ORG_ID`
  - [Token](https://vercel.com/docs/cli#introduction/global-options/token): `VERCEL_TOKEN` (used by the Vercel CLI)
  - [Projects](https://vercel.com/docs/concepts/projects/overview) `next-app-staging` / `next-app-production`: Isolated runtime environments.
    - Project ID: `VERCEL_PROJECT_ID`
    - Root Directory: `apps/next-app` (`vercel pull` downloads and saves this to `.vercel/project.json`)
    - Environment Variables: Add all environment variables needed during runtime (environment scope is always `Production`)

## Interactions

- [Vercel Dashboard](https://vercel.com/dashboard)
- Vercel CLI deploys local builds to Vercel.
- Users access web apps hosted on Vercel.

# 🛰️ Operations

## Monitoring

- [Vercel Dashboard](https://vercel.com/dashboard)
  - Project
    - [View Function Logs](https://vercel.com/docs/concepts/deployments/logs#function-logs): View log output of server-side application code.
