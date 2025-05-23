// import express from "express";

const express = require("express");
const router = express.Router();
const postController = require("@/controllers/admin/postController");

router.get("/", postController.index);

module.exports = router;
