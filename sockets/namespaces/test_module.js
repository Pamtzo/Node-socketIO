module.exports = function(io) {
    let counts = {};
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
          //https://socket.io/docs/v3/emit-cheatsheet/
          io.to(socket.office).emit("Count", counts[socket.office]);
        })
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });      
};