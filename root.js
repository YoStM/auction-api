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

// Routes for all models
Routes(Server);
// http request errors management
Server.use(({ res }) => {
  res.status(404).json({
    message:
      "Impossible de trouver la ressource demandée. Veuillez réessayez avec une autre URL.",
  });
});

Server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
