const express = require("express");
const router = express.Router();

const commentsValidator = require("../validator/comments.validator.js");
const {
  createComment,
  getOneComment,
  getAllComments,
  deleteComment,
  updateComment,
} = require("@/controllers/commentCotroller");

router.post("/", commentsValidator.createComment, createComment);

router.get("/:id", getOneComment);

router.get("/", getAllComments);

router.delete("/:id", deleteComment);

router.put("/:id", commentsValidator.updateComment, updateComment);

router.patch("/:id", updateComment);

module.exports = router;
