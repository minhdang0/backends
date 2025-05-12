const express = require("express");
const router = express.Router();

const postsValidator = require("@/validator/posts.validator");
const {
  createPost,
  getOnePost,
  getAllPost,
  deletePost,
  updatePost,
} = require("@/controllers/postController");

router.post("/", postsValidator.createPost, createPost);

router.get("/:id", getOnePost);

router.get("/", getAllPost);

router.delete("/:id", deletePost);

router.put("/:id", postsValidator.updatePost, updatePost);

router.patch("/:id", updatePost);

router.get("/:id/comments",)

module.exports = router;
