const http = require("http");
const app = require("./app");
const config = require("./config");
const connectDB = require("./database/connectDB");

connectDB().then(() => {
  http.createServer(app).listen(config.port, () => {
    console.log("Server listening on", config.port);
  });
});
