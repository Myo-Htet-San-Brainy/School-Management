const express = require("express");

const server = express();

server.get("/", (req, res) => {
  console.log("Welcome to School Management Api.");
});

module.exports = server;
