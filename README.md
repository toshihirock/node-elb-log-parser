# elb-log-parser

[![npm version](https://badge.fury.io/js/elb-log-parser.png)](https://badge.fury.io/js/elb-log-parser)


A basic parser for ELB access logs, strongly inspired by node-clf-parser https://github.com/jfhbrook/node-clf-parser 

## Example

```
node-elb-log-parser$node
> var parse = require('./index');
undefined
> parse('2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000073 0.001048 0.000057 200 200 0 29 "GET http://www.example.com:80/ HTTP/1.1" "curl/7.38.0" - -')
{ timestamp: '2015-05-13T23:39:43.945958Z',
  elb: 'my-loadbalancer',
  client: '192.168.131.39:2817',
  backend: '10.0.0.1:80',
  request_processing_time: '0.000073',
  backend_processing_time: '0.001048',
  response_processing_time: '0.000057',
  elb_status_code: '200',
  backend_status_code: '200',
  received_bytes: '0',
  sent_bytes: '29',
  request: 'GET http://www.example.com:80/ HTTP/1.1',
  user_agent: 'curl/7.38.0',
  ssl_cipher: '-',
  ssl_protocol: '-' }
>
```

You get the idea.

## License

WTFPL
