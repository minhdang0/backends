// import express from "express";

const express = require("express");
const router = express.Router();
const analyticController = require("@/controllers/admin/analyticController");

router.get("/", analyticController.index);

module.exports = router;
