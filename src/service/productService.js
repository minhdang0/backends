const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "products";

const getAllProduct = async (title) => {
  let products = await readDb(RESOURCE);
  if (title) {
    products = products.filter((item) =>
      item.title.toLowerCase().includes(title)
    );
  }
  return products;
};

const getProductById = async (productId) => {
  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === productId);

  return product;
};

const createProduct = async (data) => {
  const products = await readDb(RESOURCE);
  const id = (products.at(-1).id ?? 0) + 1;

  const newData = { id, ...data };

  products.push(newData);

  await writeDb(RESOURCE, products);

  return newData;
};
const getIndexProduct = async (productId) => {
  const products = await readDb(RESOURCE);
  const index = products.findIndex((item) => item.id === productId);
  return index;
};
const productService = {
  getAllProduct,
  getProductById,
  getIndexProduct,
  createProduct,
};

module.exports = productService;
