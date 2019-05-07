const bcrypt = require('bcryptjs');

const Users = require('./users/users-model.js');

function protected(req, res, next) {
  const {username, password } = req.headers;

  if(req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: "invalid credentials" });
  }
}

// function protected(req, res, next) {
//   const { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials: You shall not pass!' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json(error);
//       });
//   } else {
//     res.status(400).json({ message: 'You shall not pass!' });
//   }
// }

module.exports = protected;
