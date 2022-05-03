const { Auction } = require("../db/sequelize");

const getAllAuctions = (server) => {
  server.get("/auctions", (req, res) => {
    Auction.findAll()
      .then((auctions) => {
        res.status(200).json({ data: auctions });
      })
      .catch((error) => {
        res.status(500).json({
          message: "La liste des enchères n'a pas pu être récupérée.",
          data: error,
        });
      });
  });
};

const getAuctionByPk = (server) => {
  server.get("/auction/:id", (req, res) => {
    const Id = parseInt(req.params.id);
    return Auction.findByPk(Id)
      .then((auction) => {
        res.status(201).json({
          message: `L'enchère ${auction.id} a été récupérée avec succès.`,
          data: auction,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Impossible de récupérer la ressource demandée. Veuillez réessayer dans quelques instants.",
          data: error,
        });
      });
  });
};

const createAuction = (server) => {
  server.post("/auction", (req, res) => {
    res.send("hello from auction creation");
  });
};

const updateAuction = (server) => {
  server.post("/update-auction/:id", (req, res) => {
    res.send("hello from auction creation");
  });
};

const destroyAuction = (server) => {
  server.post("/destroy-auction/:id", (req, res) => {
    res.send("hello from auction creation");
  });
};

module.exports = {
  getAllAuctions,
  getAuctionByPk,
  createAuction,
  updateAuction,
  destroyAuction,
};
