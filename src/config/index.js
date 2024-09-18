const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  database: {
    url: process.env.DATABASE_URL,
  },
  apiRoute: "/api/v1",
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

module.exports = config;
