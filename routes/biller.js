const multer  = require('multer')
const upload = multer()

module.exports = function(app) {

    var biller = require('../models/dispatcherSchema');
  
    //GET - Return all billers
    findAllbillers = function(req, res) {
        biller.find({id_company:req.params.id_company, state:'new'},
        function(err, billers) {
            if(!err) {
                console.log('GET /billers')
                res.send({billers: billers}).status(200);
            } else {
                console.log('ERROR: ' + err);
                res.send({error: err}).status(400);
            }
        });
    };

    //POST - Insert a new dispatch in the DB
    addbiller = async function(req, res) {
    console.log('POST');
    console.log(req.body);
    var order = biller.count({id_company:req.body.id_company}).exec();

    var dispatch = new biller({
        order:    await order,
        date:   new Date(),
        name: 	  req.body.name,
        cc : req.body.cc,
        direction : req.body.direction,
        type_payment : req.body.type_payment,
        transaction_number : req.body.transaction_number,
        origin : req.body.origin,
        type:    req.body.type,
        detail : req.body.detail,
        total : req.body.total,
        id_office:  req.body.id_office,
        id_company : req.body.id_company,
        state:  'new',
        id_cart:  req.body.id_cart  
    });

    dispatch.save(function(err) {
        if(!err) {
            console.log('Created');
            res.send({success:1}).status(201);
        } else {
            console.log('ERROR: ' + err);
            res.send({success:0}).status(400);
            }
        });
    };

    //PUT - Update a register already exists
    updatebiller = function(req, res) {
    biller.findById(req.params.id, 
        function(err, bill) {
            req.body.state ? bill.state = req.body.state : bill.state = bill.state
            //req.body.type ? bill.type = req.body.type : bill.type = bill.type

            bill.save(function(err) {
                if(!err) {
                    console.log('Updated');
                    res.send(bill).status(200);
                } else {
                    console.log('ERROR: ' + err);
                    res.send({error: err}).status(400);
                }
            });
        });
    };

    //DELETE - Delete a Dispatch with specified ID
    deletebiller = function(req, res) {
    biller.findById(req.params.id, 
        function(err, bill) {
            bill.state = 'deleted'

            bill.save(function(err) {
                if(!err) {
                    console.log('Deleted');
                    res.send(bill).status(200);
                } else {
                    console.log('ERROR: ' + err);
                    res.send({error: err}).status(400);
                }
            });
        });
    }
  
    //Link routes and functions
    app.get('/billers/:id_company',findAllbillers);
    app.post('/biller', upload.none(), addbiller);
    app.put('/biller/:id', upload.none(), updatebiller);
    app.delete('/biller/:id', deletebiller);
}