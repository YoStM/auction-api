const Bcrypt = require("bcryptjs");
const { ValidationError } = require("sequelize");
const { User } = require("../db/sequelize");

// const getAllUsers = (server) => {
//   server.get("/users", (req, res) => {
//     res.send("hello from all users");
//   });
// };
const getUserByPk = (server) => {
  server.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    User.findByPk(userId)
      .then((user) => {
        if (user === null) {
          return res
            .status(404)
            .json({ message: "L'utilisateur demandé n'existe pas." });
        }
        res.json({
          message: "Voici l'utilisateur demandé.",
          data: user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Impossible de récupérer la ressource demandée.",
          data: error,
        });
      });
  });
};
const createUser = (server) => {
  server.post("/user", (req, res) => {
    const pwd = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    Bcrypt.hash(pwd, 10).then((hash) => {
      return User.create({ email: email, username: username, password: hash })
        .then(() => {
          res.status(201).json({
            message: `L'utilisateur a bien été enregitré.`,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message:
              "L'utilisateur n'a pas pu être enregistré, veuillez réessayer dans quelques instants.",
            error: error.message,
          });
        });
    });
  });
};

const updateUser = (server) => {
  server.put("/user/:id", (req, res) => {
    let userId = req.params.id;
    let hash = "";
    let pwd = req.params.password;
    if (pwd) {
      Bcrypt.hash(req.params.password, 10).then((hashedPwd) => {
        hash = hashedPwd;
        pwd = hash;
      });
      User.update(pwd, { where: { id: userId } }).then(() => {
        User.findByPk(userId)
          .then((user) => {
            if (user === null) {
              return res
                .status(404)
                .then({ message: "L'utilisateur demandé n'existe pas." });
            }
            res
              .status(200)
              .json({ message: `L'utilisateur a bien été modifié.` });
          })
          .catch((error) => {
            if (error instanceof ValidationError) {
              return res
                .status(400)
                .json({ message: error.message, data: error });
            }
            res.status(500).json({
              message: "L'utilisateur n'a pas pu être modifié.",
              data: error,
            });
          });
      });
    }
    User.update(req.body, { where: { id: userId } }).then(() => {
      User.findByPk(userId)
        .then((user) => {
          if (user === null) {
            return res
              .status(404)
              .then({ message: "L'utilisateur demandé n'existe pas." });
          }
          res
            .status(200)
            .json({ message: `L'utilisateur a bien été modifié.` });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          res.status(500).json({
            message: "L'utilisateur n'a pas pu être modifié.",
            data: error,
          });
        });
    });
  });
};

const destroyUser = (server) => {
  server.delete("/user/:id", (req, res) => {
    const userId = req.params.id;
    User.findByPk(userId).then((user) => {
      if (user === null) {
        return res
          .status(404)
          .json({ message: "L'utilisateur demandé n'existe pas." });
      }
      const DeletedUser = user;
      User.destroy({ where: { id: user.id } })
        .then(() => {
          res.json({
            message: `L'utilisateur ${DeletedUser.username} a bien été supprimé.`,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message:
              "Impossible de supprimé l'utilisateur. Réessayez dans quelques instants.",
            error: error.message,
          });
        });
    });
  });
};
module.exports = {
  // getAllUsers,
  getUserByPk,
  createUser,
  updateUser,
  destroyUser,
};
