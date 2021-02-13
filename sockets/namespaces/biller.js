module.exports = function(io) {
    const billerNamespace = io.of('/biller');

    billerNamespace.on('connection', socket => {
        console.log("biller connected")
        socket.on("Join_company", company =>{
            console.log("company", company)
            socket.join(company.toString())
        })
        socket.on("disconnect", () => {
            console.log("biller disconnected");
        });
    });      
};