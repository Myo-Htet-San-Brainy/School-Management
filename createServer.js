const express = require("express");
const server = express();

const schoolRouter = require("./Routes/SchoolRoutes");

server.get("/", (req, res) => {
  res.send("Welcome to School Management Api.");
});

server.use("/api/v1/schools", schoolRouter);

module.exports = server;
