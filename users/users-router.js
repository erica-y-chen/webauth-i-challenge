const router = require('express').Router();

const Users = require('./users-model.js');
const protected = require('../protected-middleware.js');

router.get('/api/users', protected, (req, res) => {
    Users.find()
    .then(users=>{
        res.json(users);
    })
    .catch(err => res.send(err));
})


module.exports = router;