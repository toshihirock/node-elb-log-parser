#! /usr/bin/env node
module.exports = function (line) {
  var parsed = {};
  var url = require('url');

  var request_labels = 
  [
    'request_method',
    'request_uri',
    'request_http_version',
    'request_uri_scheme',
    'request_uri_host',
    'request_uri_port',
    'request_uri_path',
    'request_uri_query'
  ];

  //
  // Trailing newline? NOTHX
  //
  if (line.match(/\n$/)) {
    line = line.slice(0, line.length - 1);
  }

  [
    { 'timestamp'                   : { delim: ' '   } },
    { 'elb'                         : { delim: ' '   } },
    { 'client'                      : { delim: ':'   } },
    { 'client_port'                 : { delim: ' '   } },
    { 'backend'                     : { delim: ' '   } },
    { 'request_processing_time'     : { delim: ' '   , asFloat: true } },
    { 'backend_processing_time'     : { delim: ' '   , asFloat: true } },
    { 'response_processing_time'    : { delim: ' '   , asFloat: true } },
    { 'elb_status_code'             : { delim: ' '   , asFloat: true } },
    { 'backend_status_code'         : { delim: ' '   , asFloat: true } },
    { 'received_bytes'              : { delim: ' '   , asFloat: true } },
    { 'sent_bytes'                  : { delim: ' "'  , asFloat: true } },
    { 'request'                     : { delim: '" "' } },
    { 'user_agent'                  : { delim: '" '  } },
    { 'ssl_cipher'                  : { delim: ' '   } },
    { 'ssl_protocol'                : { delim: ' '   } }
  ].some(function (t) {
    var label = Object.keys(t)[0];
    delimiter = t[label].delim;
    var asFloat = t[label].asFloat;
    var m = line.match(delimiter);
    if (m === null) {
      //
      // No match. Try to pick off the last element.
      //
      m = line.match(delimiter.slice(0, 1));

      if (m === null) {
        field = line;
      }
      else {
        field = line.substr(0, m.index);
      }
    } else {
      field = line.substr(0, m.index);
      line = line.substr(m.index + delimiter.length);
    }
    parsed[label] = asFloat ? parseFloat(field) : field;
  });

  // backend
  if(parsed.backend != -1) {
    parsed['backend_port'] = parsed.backend.split(":")[1];
    parsed['backend'] = parsed.backend.split(":")[0];
  } else {
    parsed['backend_port'] = '-1';
  }

  // request
  if(parsed.request != '- - - ') {
    var i = 0;
    var method = parsed.request.split(" ")[0];
    var url = url.parse(parsed.request.split(" ")[1]);
    var http_version = parsed.request.split(" ")[2];

    parsed[request_labels[i]] = method;
    i++;
    parsed[request_labels[i]] = url.href;
    i++;
    parsed[request_labels[i]] = http_version;
    i++;
    parsed[request_labels[i]] = url.protocol;
    i++;
    parsed[request_labels[i]] = url.hostname;
    i++;
    parsed[request_labels[i]] = url.port;
    i++;
    parsed[request_labels[i]] = url.pathname;
    i++;
    parsed[request_labels[i]] = url.query;

  } else {
    request_labels.forEach(function(label) {
      parsed[label] = '-';
    });
  }

  return parsed;
};

if (require.main === module) {
  var split = require('split');
  var Transform = require('stream').Transform;
  process.stdin
    .pipe(split())
    .pipe(new Transform({
      decodeStrings: false,
      transform: function (line, encoding, callback) {
        if (line) {
          this.push(JSON.stringify(module.exports(line)) + '\n');
        }
        callback();
      }
    }))
    .pipe(process.stdout);
}