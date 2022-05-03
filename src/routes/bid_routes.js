const getAllBids = (server) => {
    server.get("/bids", (req,res) => {
      res.send("hello from all bids");
    });
  }
  const getBidByPk = (server) => {
    server.get("/bid/:id", (req,res) => {
      res.send("hello from one Bid by pk");
    });
  }
  const createBid = (server) => {
    server.post("/bids", (req,res)=> {
      res.send("hello from Bid creation");
    })
  }
  const updateBid = (server) => {
    server.post("/update-bid/:id", (req,res)=> {
      res.send("hello from Bid creation");
    })
  }
  const destroyBid = (server) => {
    server.post("/destroy-bid/:id", (req,res)=> {
      res.send("hello from Bid creation");
    })
  }
  module.exports = {
    getAllBids,
    getBidByPk,
    createBid,
    updateBid,
    destroyBid
  }