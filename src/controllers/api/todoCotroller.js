const { readDb, writeDb } = require("../../utils/db");

const RESOURCE = "todos";

exports.getAllTodos = async (req, res) => {
  let todos = await readDb(RESOURCE);

  if (!todos) {
    res.status(404).json({
      status: "error",
      message: "Not found!",
    });
    return;
  }

  if (req.query.title) {
    const searchValue = req.query.title.trim().toLowerCase();
    todos = todos.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
  }

  res.status(200).json({
    status: "success",
    data: todos,
  });
};

exports.getOneTodo = async (req, res) => {
  const id = +req.params.id;
  const todos = await readDb(RESOURCE);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: todo,
  });
};

exports.createTodo = async (req, res) => {
  const todos = await readDb(RESOURCE);
  const nextId = (todos.at(-1)?.id ?? 0) + 1;
  const data = {
    id: nextId,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  todos.push(data);
  await writeDb(RESOURCE, todos);

  res.status(201).json({
    status: "success",
    data: data,
  });
};

exports.updateTodo = async (req, res) => {
  const id = +req.params.id;
  const todos = await readDb(RESOURCE);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }

  Object.assign(todo, req.body);
  todo.updatedAt = new Date().toISOString();

  await writeDb(RESOURCE, todos);

  res.status(200).json({
    status: "success",
    data: todo,
  });
};

exports.deleteTodo = async (req, res) => {
  const id = +req.params.id;
  const todos = await readDb(RESOURCE);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }

  todos.splice(index, 1);
  await writeDb(RESOURCE, todos);

  res.status(204).json();
};
