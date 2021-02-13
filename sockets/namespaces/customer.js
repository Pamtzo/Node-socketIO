module.exports = function(io) {
    const customerNamespace = io.of('/customer');

    customerNamespace.on('connection', socket => {
        console.log("customer connected")
        socket.on('Join_user', id=>{
            console.log("user", id)
            socket.join(id.toString())
        })
        socket.on("disconnect", () => {
            console.log("customer disconnected");
        });
    });      
};