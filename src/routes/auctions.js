module.exports = (server) => {
  server.get("/", (req, res) => {
    res.send("auctions.js");
  });
};
