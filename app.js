const port = process.env.PORT || 4001;

const server = require('./sockets/main')
server.listen(port, () => console.log(`Listening on port ${port}`));