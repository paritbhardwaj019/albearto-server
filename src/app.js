const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");

const config = require("./config");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://albearoti-client.vercel.app"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(config.apiRoute + "/user", userRouter);
app.use(config.apiRoute + "/post", postRouter);

module.exports = app;
