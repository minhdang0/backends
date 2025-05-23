// import express from "express";

const express = require("express");
const router = express.Router();
const categoryController = require("@/controllers/admin/categoryController");

router.get("/", categoryController.index);

module.exports = router;
