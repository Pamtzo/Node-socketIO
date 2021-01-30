const multer  = require('multer')
const upload = multer()

module.exports = function(app) {

    var dispatcher = require('../models/dispatcherSchema');
  
    //GET - Return all dispatchers
    findAllDispatchs = function(req, res) {
        dispatcher.find({id_office:req.params.id_office,$or:[{state:{$eq:'factured'}},{state:{$eq:'prepare'}}]},
        function(err, dispatchs) {
            if(!err) {
                console.log('GET /dispatchs')
                res.send({dipatchs: dispatchs}).status(200);
            } else {
                console.log('ERROR: ' + err);
                res.send({dipatchs: dispatchs}).status(400);
            }
        });
    };

    //PUT - Update a register already exists
    updateDispatcher = function(req, res) {
    dispatcher.findById(req.params.id, 
        function(err, dispatch) {
            req.body.state ? dispatch.state = req.body.state : dispatch.state = dispatch.state
            //req.body.type ? dispatch.type = req.body.type : dispatch.type = dispatch.type

            dispatch.save(function(err) {
                if(!err) {
                    console.log('Updated');
                    res.send(dispatch).status(200);
                } else {
                    console.log('ERROR: ' + err);
                    res.send({error: err}).status(400);
                }
            });
        });
    };

    //DELETE - Delete a Dispatch with specified ID
    deleteDispatcher = function(req, res) {
    dispatcher.findById(req.params.id, 
        function(err, dispatch) {
            dispatch.state = 'deleted'

            dispatch.save(function(err) {
                if(!err) {
                    console.log('Deleted');
                    res.send(dispatch).status(200);
                } else {
                    console.log('ERROR: ' + err);
                    res.send({error: err}).status(400);
                }
            });
        });
    }
  
    //Link routes and functions
    app.get('/dispatchs/:id_office',findAllDispatchs);
    app.put('/dispatch/:id', upload.none(), updateDispatcher);
    app.delete('/dispatch/:id', deleteDispatcher);
}