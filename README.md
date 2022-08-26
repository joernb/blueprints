<h1 align="center">
  <div>🗺️</div>
  Blueprints
</h1>

This is a collection of Full Stack JavaScript-based system prototypes stored in different Git branches. All prototypes are based on the Monorepo structure defined in the `main` branch. Derived branches typically integrate a framework or a cloud service and implement some limited functionality to make it runnable and demoable.

**[main](../../tree/main)**: Monorepo base structure for infrastructure, applications and libraries.

- **[next](../../tree/next/main)**: React-based web app. Based on [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) with TypeScript.
  - **[heroku](../../tree/next/heroku/main)**: Deploy and run the app on [Heroku](https://devcenter.heroku.com).
  - **[vercel](../../tree/next/vercel/main)**: Deploy and run the app on [Vercel](https://vercel.com).
  - **[auth0](../../tree/next/auth0/main)**: User accounts and authentication/authorization.
    - **[stripe](../../tree/next/auth0/stripe/main)**: Integrate product/subscription payment with [Stripe](https://stripe.com/docs).
  - **[new-relic](../../tree/next/new-relic/main)**: Collect and process frontend and backend telemetry data.
  - **[gitlab](../../tree/next/gitlab/main)**: Use GitLab CI/CD to build, test and deploy.
- **[react-native](../../tree/react-native/main)**: React Native mobile app for iOS/Android with a Node.js backend.
