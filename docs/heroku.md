# Heroku

## Getting started

[Install the CLI](https://devcenter.heroku.com/articles/heroku-cli):

```sh
brew tap heroku/brew && brew install heroku
```

```sh
heroku login
```

## Deploy a docker image

Deploy a docker image tagged with `foo`:

```sh
docker login --email=_ --username=_ --password="$HEROKU_AUTH_TOKEN" registry.heroku.com
docker tag foo registry.heroku.com/$HEROKU_APP_NAME/web
docker push registry.heroku.com/$HEROKU_APP_NAME/web
```

## Rollout

```sh
heroku container:release web -a $HEROKU_APP_NAME
```
