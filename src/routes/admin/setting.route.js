// import express from "express";

const express = require("express");
const router = express.Router();
const settingController = require("@/controllers/admin/settingController");

router.get("/", settingController.index);

module.exports = router;
