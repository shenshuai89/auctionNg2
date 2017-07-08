"use strict";
var http = require('http');
var server = http.createServer(function (request, response) {
    response.end("hello node!");
});
server.listen(8000);
