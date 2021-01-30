module.exports = function(io) {
    const customerNamespace = io.of('/customer');

    customerNamespace.on('connection', socket => {
        console.log("customer connected")
        socket.on("Use_company", office =>{
            socket.company = company
        })
        socket.on('Join_purchase', id=>{
            socket.join(id)
        })
        socket.on("New_purchase", id=>{
            socket.join(id)
            io.of('/biller').to(socket.company).emit('New_bill')
            socket.emit("Update_purchase")
        })
        socket.on("Leave_purchase", id=>{
            customerNamespace.to(id).emit("Update_purchase")
            socket.leave(id)
        })
        socket.on("disconnect", () => {
            console.log("customer disconnected");
          });
    });      
};