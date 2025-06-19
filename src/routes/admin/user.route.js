// import express from "express";

const userController = require("@/controllers/admin/userController.js");
const userValidator = require("@/validator/admin/user.validator");
const express = require("express");
const router = express.Router();

router.get("/create", userController.create);

router.get("/", userController.index);

router.post("/", userValidator.createUser, userController.store);

router.get("/:id", userController.show);

router.get("/:id/edit", userController.edit);

router.patch("/:id", userController.update);

router.delete("/:id", userController.delete);

module.exports = router;
