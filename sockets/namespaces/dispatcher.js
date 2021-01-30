module.exports = function(io) {
    const dispatcherNamespace = io.of('/dispatcher');

    dispatcherNamespace.on('connection', socket => {
        console.log("dispatcher connected")
        socket.on("Join_office", office =>{
            socket.office = office
            socket.join(office)
        })
        socket.on("New_dispatch", id=>{
            dispatcherNamespace.to(socket.office).emit("Query_dispatchs")
            io.of('/customer').to(id).emit('Update_purchase')
        })
        socket.on("Update_dispatch", id=>{
            dispatcherNamespace.to(socket.office).emit("Query_dispatchs")
            io.of('/customer').to(id).emit('Update_purchase')
        })
        socket.on("Deleted", id=>{
            io.of('/customer').to(id).emit('Leave_purchase', id)
        })
        socket.on("disconnect", () => {
            console.log("dispatcher disconnected");
          });
    });      
};