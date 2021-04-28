const multer  = require('multer')
const upload = multer()

module.exports = function(app,io, authcode) {
    const dispatcherNamespace = io.of('/dispatcher');
    const billerNamespace = io.of('/biller');
    //POST - Se actualiza un despacho
    updateDispatch = function(req, res) {
        if(req.headers.authcode==authcode){
            console.log("updateDispatch",req.body)
            dispatcherNamespace.to(req.body.id_office).emit("Query_dispatchs",{sounds:false})
            io.of('/customer').to(req.body.email).emit('Update_purchase', req.body.id_company)
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };

    //POST - Se facturo el pedido
    billed = function(req, res) {
        if(req.headers.authcode==authcode){
            console.log("billed",req.body)
            billerNamespace.to(req.body.id_company).emit("Query_bills")
            io.of('/dispatcher').to(req.body.id_office).emit("Query_dispatchs")
            io.of('/customer').to(req.body.email).emit('Update_purchase')
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };

    //POST - Cerrar officeJSON
    closeOffice = function(req, res) {
        console.log("closeOffice",req.body)
        let office = JSON.parse(req.body.id_offices)
        if(req.headers.authcode==authcode){
            for(id of office){
                console.log(id)
                io.of('/customer').to(id).emit('Office_closed')
            }
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };

    //Link routes and functions
    app.post('/biller', upload.none(), billed);
    app.post('/office', closeOffice);
    app.post('/dispatcher',upload.none(),updateDispatch);
}