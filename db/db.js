const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "educaseschool.cp0q68uyorz5.ap-southeast-1.rds.amazonaws.com",
  user: "admin",
  password: "Brainydrinksmilk1!",
  database: "School_Management",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

module.exports = db;
