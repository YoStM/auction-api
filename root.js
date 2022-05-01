const dotenv = require("dotenv").config({ path: "./config/.env" });
const EXPRESS = require("express");
const BODY_PARSER = require("body-parser");
const MORGAN = require("morgan");

const Server = EXPRESS();
const PORT = process.env.PORT;

Server.use(MORGAN("dev")).use(BODY_PARSER.json());

Server.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
