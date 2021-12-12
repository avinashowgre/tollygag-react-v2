const express = require("express");
const router = express.Router();

const isUserAuthenticated = require("../middleware/auth");

const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.get("/:id", getPost);
router.get("/", getAllPosts);
router.post("/", isUserAuthenticated, createPost);
router.delete("/:id", isUserAuthenticated, deletePost);
router.patch("/:id", isUserAuthenticated, updatePost);

module.exports = router;
