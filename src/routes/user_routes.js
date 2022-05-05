const Bcrypt = require('bcryptjs')
const { ValidationError } = require('sequelize/types')
const { User } = require('../db/sequelize')

// const getAllUsers = (server) => {
//   server.get("/users", (req, res) => {
//     res.send("hello from all users");
//   });
// };
const getUserByPk = (server) => {
  server.get('/user/:id', (req, res) => {
    res.send('hello from one User by pk')
  })
}
const createUser = (server) => {
  server.post('/user', (req, res) => {
    const pwd = req.body.password
    const email = req.body.email
    const username = req.body.username
    Bcrypt.hash(pwd, 10).then((hash) => {
      return User.create({ email: email, username: username, password: hash })
        .then((user) => {
          res.status(201).json({
            message: `L'utilisateur a bien été enregitré.`,
          })
        })
        .catch((error) => {
          res.status(500).json({
            message:
              "L'utilisateur n'a pas pu être enregistré, veuillez réessayer dans quelques instants.",
            error: error.message,
          })
        })
    })
  })
}

const updateUser = (server) => {
  server.put('/user/:id', (req, res) => {
    let userId = req.params.id
    let hash = ''
    let pwd = req.params.password
    if (pwd) {
      Bcrypt.hash(req.params.password, 10).then((hashedPwd) => {
        hash = hashedPwd
        pwd = hash
      })
      User.update(pwd, { where: { id: userId } }).then(() => {
        return User.findByPk(userId)
          .then((user) => {
            if (user === null) {
              res
                .status(404)
                .then({ message: "L'utilisateur demandé n'existe pas." })
            }
            res
              .status(200)
              .json({ message: `L'utilisateur a bien été modifié.` })
          })
          .catch((error) => {
            if (error instanceof ValidationError) {
              return res
                .status(400)
                .json({ message: error.message, data: error })
            }
            res.status(500).json({
              message: "L'utilisateur n'a pas pu être modifié.",
              data: error,
            })
          })
      })
    }
    User.update(req.body, { where: { id: userId } }).then(() => {
      return User.findByPk(userId)
        .then((user) => {
          if (user === null) {
            res
              .status(404)
              .then({ message: "L'utilisateur demandé n'existe pas." })
          }
          res.status(200).json({ message: `L'utilisateur a bien été modifié.` })
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error })
          }
          res.status(500).json({
            message: "L'utilisateur n'a pas pu être modifié.",
            data: error,
          })
        })
    })
  })
}

const destroyUser = (server) => {
  server.delete('/destroy-user/:id', (req, res) => {
    // Soft delete maybe - Paranoid
  })
}
module.exports = {
  // getAllUsers,
  getUserByPk,
  createUser,
  updateUser,
  destroyUser,
}
