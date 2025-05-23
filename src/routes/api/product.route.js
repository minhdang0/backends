const express = require("express");

const productValidator = require("../../validator/product.validator.js");
const {
  createProduct,
  getOneProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../../controllers/api/productController.js");
const router = express.Router();

router.post("/", productValidator.createProduct, createProduct);

router.get("/:id", getOneProduct);

router.get("/", getAllProducts);

router.delete("/:id", deleteProduct);

router.put("/:id", productValidator.updateProduct, updateProduct);

router.patch("/:id", updateProduct);

module.exports = router;
