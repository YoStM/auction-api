const getAllAuctions = (server) => {
  server.get("/auctions", (req,res) => {
    res.send("hello from all auctions");
  });
}
const getAuctionByPk = (server) => {
  server.get("/auction/:id", (req,res) => {
    res.send("hello from one auction by pk");
  });
}
const createAuction = (server) => {
  server.post("/auction", (req,res)=> {
    res.send("hello from auction creation");
  })
}
const updateAuction = (server) => {
  server.post("/update-auction/:id", (req,res)=> {
    res.send("hello from auction creation");
  })
}
const destroyAuction = (server) => {
  server.post("/destroy-auction/:id", (req,res)=> {
    res.send("hello from auction creation");
  })
}
module.exports = {
  getAllAuctions,
  getAuctionByPk,
  createAuction,
  updateAuction,
  destroyAuction
}


