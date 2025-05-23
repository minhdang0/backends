const express = require("express");

const todoValidator = require("../../validator/todo.validator.js");
const {
  createTodo,
  getOneTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
} = require("../../controllers/api/todoCotroller.js");

const router = express.Router();

router.post("/", todoValidator.createTodo, createTodo);

router.get("/:id", getOneTodo);

router.get("/", getAllTodos);

router.delete("/:id", deleteTodo);

router.put("/:id", todoValidator.updateTodo, updateTodo);

router.patch("/:id", updateTodo);

module.exports = router;
