module.exports = function(io) {
    const billerNamespace = io.of('/biller');

    billerNamespace.on('connection', socket => {
        console.log("biller connected")
        socket.on("Join_company", company =>{
            socket.company = company
            socket.join(company)
        })
        socket.on("New_bill", ()=>{
            billerNamespace.to(socket.company).emit("Query_bills")
        })
        socket.on("Billed", (id, id_office)=>{
            billerNamespace.to(socket.company).emit("Query_bills")
            io.of('/dispatcher'),to(id_office).emit("New_dispatch", id)
        })
        socket.on("Deleted", id=>{
            io.of('/customer').to(id).emit('Leave_purchase', id)
        })
        socket.on("disconnect", () => {
            console.log("biller disconnected");
          });
    });      
};