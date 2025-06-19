const express = require("express");
const authController = require("@/controllers/admin/authController");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/verify-email", authController.verifyEmail);

router.delete("/logout", authController.logout);

module.exports = router;
