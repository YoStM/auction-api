const { User } = require("../db/sequelize");

const getAllUsers = (server) => {
  server.get("/users", (req, res) => {
    res.send("hello from all users");
  });
};
const getUserByPk = (server) => {
  server.get("/user/:id", (req, res) => {
    res.send("hello from one User by pk");
  });
};
const createUser = (server) => {
  server.post("/user", (req, res) => {
    res.send("hello from User creation");
  });
};
const updateUser = (server) => {
  server.post("/update-user/:id", (req, res) => {
    res.send("hello from User creation");
  });
};
const destroyUser = (server) => {
  server.post("/destroy-user/:id", (req, res) => {
    res.send("hello from User creation");
  });
};
module.exports = {
  getAllUsers,
  getUserByPk,
  createUser,
  updateUser,
  destroyUser,
};
