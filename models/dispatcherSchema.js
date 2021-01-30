const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Model = require('../utils/model')

var dispatcherSchema = new Schema({
    //https://mongoosejs.com/docs/schematypes.html#objectids
    order : {type: Number},
    date : {type: Date, default: Date.now},
    name : {type: String},
    cc : {type: String},
    direction : {type: String},
    type_payment : {type: String}, enum:['PSE','credito','efectivo'],
    transaction_number : {type: Number},
    origin : {type: String, enum:['web','mobile']},
    type : {type: String, enum:['local', 'delivery']},
    detail : {type: String},
    total : {type: Number},
    id_office : {type: Number},
    id_company : {type: Number},
    state : {type: String, enum:['new','factured','prepare','dispatch','deleted']},
    id_cart : {type: Number}
});

module.exports = new Model('dispatcher', { 
    schema: dispatcherSchema,
    connection: 'myway'
});