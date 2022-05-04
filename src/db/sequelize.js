const dotenv = require("dotenv").config({ path: "./config/.env" });
const { Sequelize, DataTypes } = require("sequelize");

let seq;
if (process.env.NODE_ENV === "production") {
  //   sequelize = new Sequelize(process.env.JAWSDB_MARIA_URL);
} else {
  seq = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PWD,
    {
      host: "localhost",
      dialect: "mariadb",
      dialectOptions: {
        timezone: "Etc/GMT-2",
      },
      logging: false,
    }
  );
}

const CategoryModel = require("../models/category");
const Category = CategoryModel(seq, DataTypes);
const UserModel = require("../models/user");
const User = UserModel(seq, DataTypes);
const BidModel = require("../models/bid");
const Bid = BidModel(seq, DataTypes);
const AuctionModel = require("../models/auction");
const Auction = AuctionModel(seq, DataTypes);

//////////////////////////
// Models relationships //

User.hasMany(Auction, {
  as: "seller",
  foreignKey: {
    name: "seller_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
User.hasMany(Auction, {
  as: "buyer",
  foreignKey: {
    name: "buyer_id",
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
Auction.belongsTo(User);

User.hasMany(Bid, {
  foreignKey: {
    name: "user_id",
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
Bid.belongsTo(User);

Auction.hasMany(Bid);
Bid.belongsTo(Auction);
Category.hasMany(Auction);
Auction.belongsTo(Category);
//////////////////////////

const Init = () => {
  return seq.sync().then((_) => {
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  User,
  Category,
  Auction,
  Bid,
  Init,
};
