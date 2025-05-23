// import express from "express";

const express = require("express");
const router = express.Router();
const productController = require("@/controllers/admin/productController");

router.get("/", productController.index);

module.exports = router;
