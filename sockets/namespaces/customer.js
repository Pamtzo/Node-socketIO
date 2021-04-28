module.exports = function(io) {
    const customerNamespace = io.of('/customer');

    customerNamespace.on('connection', socket => {
        console.log("customer connected")
        socket.on("Join_office", office =>{
            console.log("office", office)
            socket.join(office.toString())
        })
        socket.on("Leave_office", office =>{
            console.log("office", office)
            socket.leave(office.toString())
        })
        socket.on("Join_company", company =>{
            console.log("company", company)
            socket.join(company.toString())
        })
        socket.on('Join_user', id=>{
            console.log("user", id)
            socket.join(id.toString())
        })
        socket.on("disconnect", () => {
            console.log("customer disconnected");
        });
    });      
};