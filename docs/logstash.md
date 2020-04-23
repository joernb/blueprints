# Logstash

## Input

[Input plugins](https://www.elastic.co/guide/en/logstash/current/input-plugins.html)

Testing `input { http { } }`:

```sh
curl -XPOST --header 'Content-Type: application/json' http://localhost:5050 -d '{
  "message": "[20/Feb/2019:14:31:22 +0100] 10.3.249.128 - 200 \"GET /my/path/foo/bar HTTP/1.1\" 0 0 -",
  "fields": {
      "source": "access",
      "system": "dev"
  }
}'
```

## Processing

## Output

Observing output on stdout can be done by configuring:

```
output {
  stdout {
  }
}
```
