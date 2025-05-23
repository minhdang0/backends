const express = require("express");
const router = express.Router();
const loginController = require("@/controllers/admin/loginController");

router.get("/", loginController.index);

module.exports = router;
