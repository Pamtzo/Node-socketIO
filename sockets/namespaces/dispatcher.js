module.exports = function(io) {
    const dispatcherNamespace = io.of('/dispatcher');

    dispatcherNamespace.on('connection', socket => {
        console.log("dispatcher connected")
        socket.on("Join_office", office =>{
            console.log("office", office)
            socket.join(office.toString())
        })
        socket.on("disconnect", () => {
            console.log("dispatcher disconnected");
        });
    });      
};