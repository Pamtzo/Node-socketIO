const express = require("express");
const http = require("http");
const fs = require('fs');
const bodyParser  = require("body-parser");
const socketIo = require("socket.io");

const options = {
    key: fs.readFileSync('utils/key.pem'),
    cert: fs.readFileSync('utils/cert.pem')
};

const index = require("../routes/index");
const app = express();

app.use(index);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = http.createServer(app);
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