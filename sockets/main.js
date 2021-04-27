const express = require("express");
const socketIo = require("socket.io");

const index = require("../routes/index");
const app = express();

const http = require('http');
const fs = require('fs');

app.use(index);

const options = {
  key: fs.readFileSync('utils/cert.key'),
  cert: fs.readFileSync('utils/cert.crt')
}

const server = http.createServer(app)

const io = socketIo(server, { cors: {
    origin: '*',
  }});

const authcode = "e7ca945126590e7c905fa1f0cafa90be7a28d51d28da399dee58cc70947e82e1"

require('../routes/company')(app,io,authcode)
require('../routes/customer')(app,io,authcode)

require('./namespaces/dispatcher')(io)
require('./namespaces/biller')(io)
require('./namespaces/customer')(io)

module.exports = server