const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');


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

module.exports = router;