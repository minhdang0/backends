const express = require("express");
const authRouter = require("./auth.route");
const postRouter = require("./posts.route");
const commentRouter = require("./comments.route");
const productRouter = require("./product.route");
const todoRouter = require("./todo.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/products", productRouter);
router.use("/products", todoRouter);

module.exports = router;
