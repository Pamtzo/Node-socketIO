const multer  = require('multer')
const upload = multer()

module.exports = function(app,io, authcode) {
    const dispatcherNamespace = io.of('/dispatcher');
    //POST - Se actualiza un despacho
    updateDispatch = function(req, res) {
        if(req.headers.authcode==authcode){
            dispatcherNamespace.to(req.body.id_office).emit("Query_dispatchs")
            io.of('/customer').to(req.body.email).emit('Update_purchase', req.body.id_company)
            res.send({ response: "Ok" }).status(200);
        }
        else{res.send({ response: "Bad authcode" }).status(403);}
    };
    //Link routes and functions
    app.post('/dispatcher',upload.none(),updateDispatch);
}