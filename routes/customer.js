const multer  = require('multer')
const upload = multer()

module.exports = function(app, io, authcode) {
    const customerNamespace = io.of('/customer');
    //POST - Se crea el carrito para facturar
    newPurchasetoBiller = function(req, res) {
        if(req.headers.authcode==authcode){
            console.log("newPurchasetoBiller")
            console.log(req.body)
            io.of('/biller').to(req.body.id_company).emit('Query_bills')
            customerNamespace.to(req.body.email).emit("Update_purchase", req.body.id_company)
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };
    //POST - Se crea el carrito para despachar
    newPurchasetoDispatcher = function(req, res) {
        if(req.headers.authcode==authcode){
            console.log("newPurchasetoDispatcher")
            console.log(req.body)
            io.of('/dispatcher').to(req.body.id_office).emit('Query_dispatchs',{sounds:true, type_service:req.body.type_service})
            customerNamespace.to(req.body.email).emit("Update_purchase", req.body.id_company)
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };
    //POST - Se actualiza la dirección en todas las tiendas
    updateDirection = function(req, res) {
        if(req.headers.authcode==authcode){
            console.log("updateDirection")
            console.log(req.body)
            customerNamespace.to(req.body.email).emit("Update_direction",{new_distance:req.body.new_distance, id_office:req.body.id_office, id_company: req.body.id_company, id_address:req.body.id_address})
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };
    //POST - Se entra en mantenimiento
    reloadPage = function(req, res) {
        if(req.headers.authcode==authcode){
            console.log("reloadPage")
            console.log(req.body)
            customerNamespace.to(req.body.id_company).emit("company_refactor")
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };
    //Link routes and functions
    app.post('/customer-to-biller',upload.none(),newPurchasetoBiller);
    app.post('/customer-to-dispatcher',upload.none(),newPurchasetoDispatcher);
    app.post('/update/address', upload.none(), updateDirection)
    app.post('/update/company', upload.none(), reloadPage)
}
