
const server = require ('./api/server.js')

const port = process.env.Port || 5000;
server.listen(port, () => console.log( `Running on port 5000`))