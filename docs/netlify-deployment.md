# Netlify Deployment

Netlify supports manual but also automated deployments. Unless the `--prod` flag is specified, deployments will be put into a "draft" stage with a different url than the production deployment.

## Manual

Just run `netlify deploy` without any preparation and it will ask for:

- the account
- the site (or create a new one)
- the folder to upload

The CLI will cache some of those answers in `.netlify`.

## Automated

Netlify deployments can be fully automated:

- specify `--dir=` command line param to specify the folder to upload
- provide token and site via environment variable
- use `--prod` to do a production deployment
