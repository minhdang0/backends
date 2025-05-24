// import express from "express";

const express = require("express");
const router = express.Router();
const forgotPasswordController = require("@/controllers/admin/forgotPasswordController");

router.get("/", forgotPasswordController.index);

module.exports = router;
