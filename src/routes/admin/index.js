const express = require("express");
const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const topicRoute = require("./topic.route");
const commentRoute = require("./comment.route");
const analyticRoute = require("./analytic.route");
const postRoute = require("./post.route");
const settingRoute = require("./setting.route");
const accountRoute = require("./account.route");
const loginRoute = require("./login.route");
const registerRoute = require("./register.route");

const router = express.Router();

router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/topics", topicRoute);
router.use("/comments", commentRoute);
router.use("/analytics", analyticRoute);
router.use("/posts", postRoute);
router.use("/settings", settingRoute);
router.use("/account-settings", accountRoute);
router.use("/login", loginRoute);
router.use("/register", registerRoute);

module.exports = router;
