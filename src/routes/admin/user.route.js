// import express from "express";

const userController = require("@/controllers/admin/userController");
const express = require("express");
const router = express.Router();

router.get("/", userController.index);
router.get("/:id", userController.show);

module.exports = router;
