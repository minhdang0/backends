const { readDb, writeDb } = require("../utils/db");

const RESOURCE = "category";

exports.getAllCategories = async (req, res) => {
  let categories = await readDb(RESOURCE);
  if (categories) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });

    return;
  }

  if (req.query?.q) {
    const searchValue = req.query?.q.trim().toLowerCase();

    if (searchValue) {
      categories = categories.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue) &&
          item.description.toLowerCase().includes(searchValue)
      );
    }
  }

  res.status(200).json({
    status: "success",
    data: categories,
  });
};

exports.getOneCategory = async (req, res) => {
  const id = +req.params.id;
  const categories = await readDb(RESOURCE);
  const category = categories.find((item) => item.id === id);

  if (!category) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });

    return;
  }

  res.status(200).json({
    status: "success",
    message: "Not found",
  });
};

exports.createCategory = async (req, res) => {
  const categories = await readDb(RESOURCE);
  const nextId = (categories.at(-1).id ?? 0) + 1;
  const data = { id: nextId, ...req.body };

  categories.push(data);

  await writeDb(RESOURCE, categories);

  res.status(201).json({
    status: "success",
    message: "Successfully create",
    data: data,
  });
};

exports.updateCategory = async (req, res) => {
  const id = +req.params.id;
  const categories = readDb(RESOURCE);
  const category = categories.find((item) => item.id === id);

  if (!category) {
    res.status(404).json({
      status: "error",
      message: "Not  found",
    });
    return;
  }
  Object.assign(category, ...req.body);

  await writeDb(RESOURCE, categories);

  res.status(200).json({
    status: "success",
    data: category,
  });
};

exports.deleteCategory = async (req, res) => {
  const categories = await readDb(RESOURCE);
  const id = +req.params.id;
  const index = categories.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });

    return;
  }
  categories.splice(index, 1);

  await writeDb(RESOURCE, categories);

  return res.status(204).json();
};
