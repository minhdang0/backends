const express = require("express");
const router = express.Router();
const {
  getOnePost,
  getAllPost,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const postsValidator = require("../validator/posts.validator");

router.post("/", postsValidator.createPost, createPost);

router.get("/:id", getOnePost);

router.get("/", getAllPost);

router.delete("/:id", deletePost);

router.put("/:id", postsValidator.updatePost, updatePost);

router.patch("/:id", updatePost);

module.exports = router;
