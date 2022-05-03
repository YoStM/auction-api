const Auctions = require("../db/auctions_fixtures");
const { Auction } = require("../db/sequelize");

function loadAuctions() {
  return Auctions.map((auction) => {
    Auction.create({
      id: auction.id,
      title: auction.title,
      description: auction.description,
      start_date: auction.start_date,
      end_date: auction.end_date,
      start_price: auction.start_price,
      status: auction.status,
      seller_id: auction.seller_id,
      CategoryId: auction.CategoryId,
    }).then((auction) => console.log(auction.toJSON()));
  });
}

loadAuctions();

// module.exports = { LoadAuctions };
