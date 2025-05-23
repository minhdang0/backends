// import express from "express";

const express = require("express");
const router = express.Router();
const commentController = require("@/controllers/admin/commentController");

router.get("/", commentController.index);

module.exports = router;
