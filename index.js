const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');
const protected = require('./protected-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("It's alive");
});

server.post('/api/register', (req,res) => {
    let user = req.body;
    const hashedPassword = bcrypt.hashSync(user.password, 6);
    user.password = hashedPassword; 

    Users.add(user)
        .then (saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.post('/api/login', (req, res) => {
    let {username, password } = req.body; 

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome to the app ${user.username}`})
            } else {
                res.status(401).json({message: 'Invalid Credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.get('/api/users', protected, (req, res) => {
    Users.find()
    .then(users=>{
        res.json(users);
    })
    .catch(err => res.send(err));
})


const port = process.env.Port || 5000;
server.listen(port, () => console.log( `Running on port 5000`))