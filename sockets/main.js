const express = require("express");
const http = require("http");
const bodyParser  = require("body-parser");
const socketIo = require("socket.io");

const index = require("../routes/index");
const app = express();

app.use(index);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes = require('../routes/dispatcher')(app)

const server = http.createServer(app);
const io = socketIo(server);

require('./namespaces/test_module')(io)
require('./namespaces/biller')(io)

module.exports = server