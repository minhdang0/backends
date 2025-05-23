// import express from "express";

const express = require("express");
const router = express.Router();
const accountController = require("@/controllers/admin/accountController");

router.get("/", accountController.index);

module.exports = router;
