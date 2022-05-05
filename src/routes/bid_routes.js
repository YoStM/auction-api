const { Bid } = require("../db/sequelize");

const getAllBids = (server) => {
  server.get("/bids", (req, res) => {
    Bid.findAll().then((bids) => {
      res
        .status(200)
        .json({ message: "Voici la liste des offres", data: bids });
    });
  });
};
const getBidByPk = (server) => {
  server.get("/bid/:id", (req, res) => {
    const ID = parseInt(req.params.id);
    return Bid.findByPk(ID)
      .then((bid) => {
        res.status(200).json({
          message: `L'offre [${bid.id}] a bien été récupérée.`,
          data: bid,
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
const createBid = (server) => {
  server.post("/bid", (req, res) => {
    const data = req.body;
    return Bid.create(data)
      .then((bid) => {
        res.status(201).json({
          message: `L'offre [${bid.id}] a bien été créée.`,
          data: bid,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Impossible de créer l'offre.",
          error: error.message,
        });
      });
  });
};
const updateBid = (server) => {
  server.put("/bid/:id", (req, res) => {
    const ID = parseInt(req.params.id);
    Bid.update(req.body, { where: { id: ID } }).then(() => {
      return Bid.findByPk(ID)
        .then((bid) => {
          if (bid === null) {
            return res
              .status(404)
              .json({ message: "L'offre demandée n'existe pas." });
          }
          res
            .status(200)
            .json({ message: `L'offre [${bid.id}] a bien été modifiée.` });
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            return res
              .status(400)
              .json({ message: error.message, data: error });
          }
          res
            .status(500)
            .json({
              message: "L'offre n'a pas pu être modifiée.",
              data: error,
            });
        });
    });
  });
};
const destroyBid = (server) => {
  server.delete("/bid/:id", (req, res) => {
    Bid.findByPk(req.params.id).then((bid) => {
      if (bid === null) {
        return res
          .status(404)
          .json({ message: "L'enchère demandée n'existe pas." });
      }
      const BidDeleted = bid;
      Bid.destroy({ where: { id: bid.id } })
        .then(() => {
          res.status(200).json({
            message: `L'enchère [${BidDeleted.id}] a bien été supprimée.`,
            data: BidDeleted,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message:
              "L'enchère n'a pas pu être supprimée. Réessayez ultérieurement.",
            data: error,
          });
        });
    });
  });
};
module.exports = {
  getAllBids,
  getBidByPk,
  createBid,
  updateBid,
  destroyBid,
};
