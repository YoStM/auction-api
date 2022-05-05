const UserRoutes = require("./user_routes");
const AuctionRoutes = require("./auction_routes");
const BidRoutes = require("./bid_routes");

module.exports = (Server) => {
  // User model routes
  UserRoutes.createUser(Server);
  UserRoutes.getUserByPk(Server);
  UserRoutes.updateUser(Server);
  UserRoutes.destroyUser(Server);
  // UserRoutes.getAllUsers(Server);

  // Auction model routes
  AuctionRoutes.createAuction(Server);
  AuctionRoutes.getAuctionByPk(Server);
  AuctionRoutes.updateAuction(Server);
  AuctionRoutes.destroyAuction(Server);
  AuctionRoutes.getAllAuctions(Server);

  // Bid model routes
  BidRoutes.createBid(Server);
  BidRoutes.getBidByPk(Server);
  BidRoutes.updateBid(Server);
  BidRoutes.destroyBid(Server);
  BidRoutes.getAllBids(Server);

  // http request errors management
  Server.use(({ res }) => {
    res.status(404).json({
      message:
        "Impossible de trouver la ressource demandée. Veuillez réessayez avec une autre URL.",
    });
  });
};
