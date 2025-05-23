// import express from "express";

const express = require("express");
const router = express.Router();
const registerController = require("@/controllers/admin/registerController");

router.get("/", registerController.index);

module.exports = router;
