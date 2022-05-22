const { ValidationError } = require("sequelize");
const { Auction } = require("../db/sequelize");
const { Op } = require("sequelize");

const getAllAuctions = (server) => {
  server.get("/auctions", async (req, res) => {
    try {
      let auctions;
      if (req.query.title) {
        const TITLE = req.query.title;
        if (TITLE.length < 3) {
          return res.status(404).json({
            message:
              "Le termne de recherche doit contenir au moins 3 caractères.",
          });
        }
        auctions = await Auction.findAll({
          where: {
            title: {
              [Op.like]: `%${TITLE}%`,
            },
          },
          order: ["title"],
        });
        return res
          .status(200)
          .json({ data: auctions, results: auctions.length });
      }

      auctions = await Auction.findAll();
      return res.status(200).json({ data: auctions, results: auctions.length });
    } catch (error) {
      return res.status(500).json({
        message: "La liste des enchères n'a pas pu êre récupérée.",
        data: error.message,
      });
    }
  });
};

const getAuctionByPk = (server) => {
  server.get("/auction/:id", async (req, res) => {
    try {
      const Id = parseInt(req.params.id);
      const auction = await Auction.findByPk(Id);
      return res.status(200).json({ data: auction });
    } catch (error) {
      return res.status(500).json({
        message:
          "Impossible de récupérer la ressource demandée. Veuillez réessayer dans quelques instants.",
        data: error,
      });
    }
  });
};

const createAuction = (server) => {
  server.post("/auction", async (req, res) => {
    try {
      const data = req.body;
      const newAuction = await Auction.create(data);
      return res.status(201).json({
        message: `L'enchère [${newAuction.title}] a bien été enregistrée.`,
        data: newAuction,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Impossible d'enregistrer l'enchère. Veuillez réessayer dans quelques instants.",
        error: error.message,
      });
    }
  });
};

const updateAuction = (server) => {
  server.put("/auction/:id", async (req, res) => {
    try {
      const ID = req.params.id;
      await Auction.update(req.body, { where: { id: ID } });
      const updatedAuction = await Auction.findByPk(ID);
      if (updatedAuction === null) {
        return res
          .status(404)
          .json({ message: "L'enchère demandée n'existe pas." });
      }
      res.status(200).json({
        message: `L'enchère [${updatedAuction.title}] a bien été modifiée.`,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      res.status(500).json({ message: "L'enchère n'a pas pu être modifiée." });
    }
  });
};

const destroyAuction = (server) => {
  server.delete("/auction/:id", async (req, res) => {
    try {
      const AuctionToDelete = await Auction.findByPk(req.params.id);
      if (AuctionToDelete === null) {
        return res
          .status(404)
          .json({ message: "L'enchère demandée n'existe pas." });
      }
      const deletedAuction = AuctionToDelete;
      Auction.destroy({ where: { id: AuctionToDelete.id } });
      res.status(200).json({
        message: `L'enchère [${deletedAuction.title}] a bien été supprimée.`,
        data: deletedAuction,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "L'enchère n'a pas pu être supprimée.", data: error });
    }
    // Auction.findByPk(req.params.id).then((auction) => {
    //   if (auction === null) {
    //     return res
    //       .status(404)
    //       .json({ message: "L'enchère demandée n'existe pas." });
    //   }
    //   const AuctionDeleted = auction;
    //   Auction.destroy({ where: { id: auction.id } })
    //     .then(() => {
    //       res.status(200).json({
    //         message: `L'enchère [${AuctionDeleted.title}] a bien été supprimée.`,
    //         data: AuctionDeleted,
    //       });
    //     })
    //     .catch((error) => {
    //       return res.status(500).json({
    //         message:
    //           "L'enchère n'a pas pu être supprimée. Réessayez ultérieurement.",
    //         data: error,
    //       });
    //     });
    // });
  });
};

module.exports = {
  getAllAuctions,
  getAuctionByPk,
  createAuction,
  updateAuction,
  destroyAuction,
};
