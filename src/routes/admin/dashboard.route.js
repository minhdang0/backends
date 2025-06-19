// import express from "express";

const express = require("express");
const router = express.Router();
const dashboardController = require("@/controllers/admin/dashboardController.js");

router.get("/", dashboardController.index);

module.exports = router;
