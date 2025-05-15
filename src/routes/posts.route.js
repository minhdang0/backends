const express = require("express");
const router = express.Router();

const postsValidator = require("@/validator/posts.validator");
const {
  createPost,
  getOnePost,
  getAllPost,
  deletePost,
  updatePost,
  getPostComments,
  createPostComments,
} = require("@/controllers/postController");
// const attachResourceLoaders = require("@/utils/attachResourceLoaders");

// attachResourceLoaders(router, ["post"]);

router.post("/", postsValidator.createPost, createPost);

router.get("/:post", getOnePost);

router.get("/", getAllPost);

router.delete("/:post", deletePost);

router.put("/:post", postsValidator.updatePost, updatePost);

router.patch("/:post", updatePost);

router.get("/:post/comments", getPostComments);

router.post("/:post/comments", createPostComments);

module.exports = router;
