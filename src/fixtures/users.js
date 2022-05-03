const Users = require("../db/users_fixtures");
const { User } = require("../db/sequelize");

function loadUsers() {
  return Users.map((user) => {
    User.create({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      credit: user.credit,
    }).then((user) => console.log(user.toJSON()));
  });
}

loadUsers();
