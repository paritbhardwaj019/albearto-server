const catchAsync = require("express-async-handler");
const httpStatus = require("http-status");
const _ = require("lodash");
const slugify = require("slugify");
const Post = require("../models/post.model");

const createPostHandler = catchAsync(async (req, res) => {
  const { title, content, keywords } = req.body;

  const post = await Post.create({
    title,
    content,
    author: req.user,
    keywords,
    slug: slugify(title, {
      replacement: "-",
      remove: undefined,
      lower: true,
    }),
  });

  res.status(httpStatus.CREATED).json({
    success: true,
    data: _.pick(post, ["title", "content", "author", "keyword", "_id"]),
  });
});

const fetchPostsHandler = catchAsync(async (req, res) => {
  const posts = await Post.find()
    .populate({
      path: "author",
      select: "_id fullName email",
    })
    .select("-__v");

  res.status(httpStatus.OK).json({
    success: true,
    data: posts,
  });
});

const postController = {
  createPostHandler,
  fetchPostsHandler,
};

module.exports = postController;
