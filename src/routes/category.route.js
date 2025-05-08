const express = require("express");
const {
  createCategory,
  getOneCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const categoriesValidator = require("../validator/categories.validator.js");
const router = express.Router();

router.post("/", categoriesValidator.createCategory, createCategory);

router.get("/:id", getOneCategory);

router.get("/", getAllCategories);

router.delete("/:id", deleteCategory);

router.put("/:id", categoriesValidator.updateCategory, updateCategory);

router.patch("/:id", updatePost);

module.exports = router;
