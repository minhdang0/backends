const { readDb, writeDb } = require("../utils/db");

const RESOURCE = "products";

exports.getAllProducts = async (req, res) => {
  let products = await readDb(RESOURCE);

  if (!products) {
    res.status(404).json({
      status: "Error",
      message: "Not found!",
    });
    return;
  }

  if (req.query.name) {
    const searchValue = req.query.name.trim().toLowerCase();
    products = products.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
  }

  res.status(200).json({
    status: "success",
    data: products,
  });
};

exports.getOneProduct = async (req, res) => {
  const id = +req.params.id;
  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === id);

  if (!product) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
};

exports.createProduct = async (req, res) => {
  const products = await readDb(RESOURCE);
  const nextId = (products.at(-1).id ?? 0) + 1;
  const data = { id: nextId, ...req.body };

  products.push(data);

  await writeDb(RESOURCE, products);

  res.status(201).json({
    status: "success",
    data: data,
  });
};

exports.updateProduct = async (req, res) => {
  const id = +req.params.id;
  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === id);

  if (!product) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }

  Object.assign(product, ...req.body);

  await writeDb(RESOURCE, products);

  res.status(200).json({
    status: "success",
    data: product,
  });
};

exports.deleteProduct = async (req, res) => {
  const id = +req.params.id;
  const products = await readDb(RESOURCE);
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
    return;
  }

  products.splice(index, 1);

  res.status(204).json();
};
