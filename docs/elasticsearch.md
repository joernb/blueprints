# Elasticsearch

## Manual operations

List indices:

```sh
curl -X GET 'http://localhost:9200/_cat/indices?v'
```

Write data:

```sh
curl -XPUT --header 'Content-Type: application/json' http://localhost:9200/samples/_doc/1 -d '{
"foo" : "bar"
}'
```

Query data:

```sh
curl -X GET http://localhost:9200/samples/_search?q=foo:bar
```

## Resources

- https://github.com/deviantony/docker-elk
