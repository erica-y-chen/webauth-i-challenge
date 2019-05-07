const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const usersRouter = require('../users/users-router.js');
const server = express();

const sessionConfig = {
    name: 'newSession',
    secret: 'this is my very first session!',
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*2,
        secure: false,
    },
    resave: false,
    saveUnitialized: true, 
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
    res.send("It's alive");
});

module.exports = server; 

