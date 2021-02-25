const multer  = require('multer')
const upload = multer()

module.exports = function(app, io, authcode) {
    const billerNamespace = io.of('/biller');

    //POST - Se facturo el pedido
    billed = async function(req, res) {
        if(req.headers.authcode==authcode){
            billerNamespace.to(req.body.id_company).emit("Query_bills")
            io.of('/dispatcher').to(req.body.id_office).emit("Query_dispatchs")
            io.of('/customer').to(req.body.email).emit('Update_purchase')
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };

    //Link routes and functions
    app.post('/biller', upload.none(), billed);
}