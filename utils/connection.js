const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;

function createConnection(name) {
    return mongoose.createConnection(config[name], 
        {useNewUrlParser: true, useUnifiedTopology: true}, 
        function(err, res){
          if(err){
            console.log('ERROR: connecting to Database: '+ name + err);
          }
          else{console.log('Connected to '+ name)}
    });
}

module.exports.on = createConnection;