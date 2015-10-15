# elb-log-parser

[![npm version](https://badge.fury.io/js/elb-log-parser.png)](https://badge.fury.io/js/elb-log-parser)
[![Build Status](https://travis-ci.org/toshihirock/node-elb-log-parser.svg?branch=master)](https://travis-ci.org/toshihirock/node-elb-log-parser)

A basic parser for ELB access logs, strongly inspired by node-clf-parser https://github.com/jfhbrook/node-clf-parser 

## When I use this npm?

+ ELB Access Log(S3)->Lambda->ElasticSearch. Example [awslabs/amazon-elasticsearch-lambda-samples](https://github.com/awslabs/amazon-elasticsearch-lambda-samples/blob/master/src/s3_lambda_es.js)
+ Analyze ELB Access Log

## Install

```
$npm install elb-log-parser
```

## Example

```
node-elb-log-parser$node
> var parse = require('./index');
undefined
> parse('2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 57 "GET https://mytest-111.ap-northeast-1.elb.amazonaws.com:443/p/a/t/h?foo=bar&hoge=fuga HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2')
{ timestamp: '2015-05-13T23:39:43.945958Z',
  elb: 'my-loadbalancer',
  client: '192.168.131.39',
  client_port: '2817',
  backend: '10.0.0.1',
  request_processing_time: '0.000086',
  backend_processing_time: '0.001048',
  response_processing_time: '0.001337',
  elb_status_code: '200',
  backend_status_code: '200',
  received_bytes: '0',
  sent_bytes: '57',
  request: 'GET https://mytest-111.ap-northeast-1.elb.amazonaws.com:443/p/a/t/h?foo=bar&hoge=fuga HTTP/1.1',
  user_agent: 'curl/7.38.0',
  ssl_cipher: 'DHE-RSA-AES128-SHA',
  ssl_protocol: 'TLSv1.2',
  backend_port: '80',
  request_method: 'GET',
  request_uri: 'https://mytest-111.ap-northeast-1.elb.amazonaws.com:443/p/a/t/h?foo=bar&hoge=fuga',
  request_http_version: 'HTTP/1.1',
  request_uri_scheme: 'https:',
  request_uri_host: 'mytest-111.ap-northeast-1.elb.amazonaws.com',
  request_uri_port: '443',
  request_uri_path: '/p/a/t/h',
  request_uri_query: 'foo=bar&hoge=fuga' }
>
```

You get the idea.

## Tests

```
$npm test
```

## License

WTFPL
