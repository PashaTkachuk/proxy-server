'use strict';

const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const config = require('./config');
const postReqRouter = require('./app/routes/postReq');

app.use(bodyParser.text()); // for parsing application/text

app.post('*', postReqRouter.handleAll);

app.use((req, res) => {
  res.send('The proxy server works only with POST requests');
});

const server = app.listen(process.env.PORT || config.proxy_server.port, process.env.IP || config.proxy_server.host, () => {
  let addr = server.address();
  console.log("Proxy server listening at", addr.address + ":" + addr.port);
});
