# Docker

[Cheat Sheet](https://devhints.io/docker)

## Dockerfile

[Dockerfile reference](https://docs.docker.com/engine/reference/builder/)

## Build an image from Dockerfile

```sh
docker build . -t foo
```

## Run a container

[Dockerhub Registry](https://hub.docker.com/search?q=&type=image)

```sh
docker run --rm -it foo
```

Additional params after the tag name will:

- be appended to the `ENTRYPOINT` command
- replace the `CMD` command

## Docker Compose

[Compose file reference](https://docs.docker.com/compose/compose-file/)

### Start

In background:

```sh
docker-compose up -d
```

With output:

```sh
docker-compose up
```

Rebuild images:

```sh
docker-compose up --build
```

### Stop

```sh
docker-compose down
```
