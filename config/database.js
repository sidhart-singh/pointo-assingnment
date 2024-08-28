const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_URL } = process.env;

const sequelize = new Sequelize("pointodb", "root", "password", {
  dialect: "mysql",
  host: "localhost",
  port: "3306",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Export the connection
module.exports = db;
