// import express from "express";

const express = require("express");
const router = express.Router();

router.get("/me", (req, res) => {
  res.send("Me");
});

router.post("/register", (req, res) => {
  res.send("Register");
});

router.post("/login", (res, req) => {
  res.send("Login");
});

router.post("/refresh-token", (req, res) => {
  res.send("Refresh-token");
});

module.exports = router;
