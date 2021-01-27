const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let counts = {};

const adminNamespace = io.of('/admin');
adminNamespace.on('connection', socket => {
  console.log("soy admin")
  socket.on('delete user', () => {
    // ...
  });
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("Join_office", data =>{
    if(!counts[data]){
      counts[data] = 0
    }
    socket.office = data
    socket.join(data)
    io.to(socket.office).emit("Count", counts[socket.office]);
  })
  socket.on("Press", () =>{
    counts[socket.office] = counts[socket.office] +1;
    //io.sockets.socket(socketId).emit(msg);
    //https://socket.io/docs/v3/emit-cheatsheet/
    io.to(socket.office).emit("Count", counts[socket.office]);
    console.log(socket)
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
