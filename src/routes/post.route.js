const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const postController = require("../controllers/post.controller");

const router = express.Router();

router
  .route("/")
  .post(checkAuth, postController.createPostHandler)
  .get(postController.fetchPostsHandler);

module.exports = router;
