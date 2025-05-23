const express = require("express");
const authRouter = require("./auth.route");
const postRouter = require("./posts.route");
const commentRouter = require("./comments.route");
const productRouter = require("./product.route");
const todoRouter = require("./todo.route");
const usersRouter = require("./users.route");
const movieRouter = require("./movies.route");
const showtimeRouter = require("./showtime.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/products", productRouter);
router.use("/todos", todoRouter);
router.use("/users", usersRouter);
router.use("/movies", movieRouter);
router.use("/showtime", showtimeRouter);

module.exports = router;
