// import express from "express";

const express = require("express");
const router = express.Router();
const topicController = require("@/controllers/admin/topicController");

router.get("/", topicController.index);

module.exports = router;
