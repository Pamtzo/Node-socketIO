const connection = require('./connection')

class Model {
    constructor(name, data) {
        this.data = data;
        return this.connection().model(name, data.schema);
    }

    connection() {
        return connection.on(this.data.connection);
    }
}

module.exports = Model;