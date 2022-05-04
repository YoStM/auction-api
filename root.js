const dotenv = require("dotenv").config({ path: "./config/.env" });
const EXPRESS = require("express");
const DB = require("./src/db/sequelize");
const BODY_PARSER = require("body-parser");
const MORGAN = require("morgan");
const Routes = require("./src/routes/index");

const Server = EXPRESS();
const PORT = process.env.PORT;

DB.Init();

Server.use(MORGAN("dev")).use(BODY_PARSER.json());

// All API endpoints
Routes(Server);

Server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
