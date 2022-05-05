const { ValidationError } = require('sequelize')
const { Auction } = require('../db/sequelize')

const getAllAuctions = (server) => {
  server.get('/auctions', (req, res) => {
    Auction.findAll()
      .then((auctions) => {
        res.status(200).json({ data: auctions })
      })
      .catch((error) => {
        res.status(500).json({
          message: "La liste des enchères n'a pas pu être récupérée.",
          data: error,
        })
      })
  })
}

const getAuctionByPk = (server) => {
  server.get('/auction/:id', (req, res) => {
    const Id = parseInt(req.params.id)
    return Auction.findByPk(Id)
      .then((auction) => {
        res.status(200).json({
          message: `L'enchère ${auction.id} a été récupérée avec succès.`,
          data: auction,
        })
      })
      .catch((error) => {
        res.status(500).json({
          message:
            'Impossible de récupérer la ressource demandée. Veuillez réessayer dans quelques instants.',
          data: error,
        })
      })
  })
}

const createAuction = (server) => {
  server.post('/auction', (req, res) => {
    const data = req.body
    return Auction.create(data)
      .then((auction) => {
        res.status(201).json({
          message: `L'enchère [${auction.title}] a bien été enregistrée.`,
          data: auction,
        })
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Impossible d'enregistrer l'enchère. Veuillez réessayer dans quelques instants.",
          error: error.message,
        })
      })
  })
}

const updateAuction = (server) => {
  server.put('/auction/:id', (req, res) => {
    const ID = req.params.id
    Auction.update(req.body, { where: { id: ID } }).then((_) => {
      return Auction.findByPk(ID)
        .then((auction) => {
          if (auction === null) {
            return res
              .status(404)
              .json({ message: "L'enchère demandée n'éxiste pas." })
          }
          res.status(200).json({
            message: `L'enchère [${auction.title}] a bien été modifiée.`,
          })
        })
        .catch((error) => {
          if (error instanceof ValidationError) {
            res.status(400).json({ message: error.message, data: error })
          }
          res
            .status(500)
            .json({ message: "L'enchère n'a pas pu être modifiée." })
        })
    })
  })
}

const destroyAuction = (server) => {
  server.delete('/auction/:id', (req, res) => {
    Auction.findByPk(req.params.id).then((auction) => {
      if (auction === null) {
        return res
          .status(404)
          .json({ message: "L'enchère demandée n'existe pas." })
      }
      const AuctionDeleted = auction
      Auction.destroy({ where: { id: auction.id } })
        .then(() => {
          res.status(200).json({
            message: `L'enchère [${AuctionDeleted.title}] a bien été supprimée.`,
            data: AuctionDeleted,
          })
        })
        .catch((error) => {
          res.status(500).json({
            message:
              "L'enchère n'a pas pu être supprimée. Réessayez ultérieurement.",
            data: error,
          })
        })
    })
  })
}

module.exports = {
  getAllAuctions,
  getAuctionByPk,
  createAuction,
  updateAuction,
  destroyAuction,
}
