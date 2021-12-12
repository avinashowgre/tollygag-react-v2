const asyncWrapper = require("../middleware/async");
const Post = require("../db/models/Post");
const { CustomAPIError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllPosts = asyncWrapper(async (req, res) => {
  const posts = await Post.find({});
  res.status(StatusCodes.OK).json({ posts });
});

const createPost = asyncWrapper(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(StatusCodes.OK).json({ post });
});

const deletePost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOneAndDelete({ _id: id });
  if (!post) {
    throw new NotFoundError(`No post with id : ${id}`);
  }
  res.status(StatusCodes.OK).json({ post });
});

const getPost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  if (!post) {
    throw new NotFoundError(`No post with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ post });
});

const updatePost = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    throw new NotFoundError(`No post with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ post });
});

module.exports = { createPost, deletePost, getAllPosts, getPost, updatePost };
