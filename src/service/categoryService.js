const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "category";

const getAllCategories = async (value) => {
  let categories = await readDb(RESOURCE);
  if (title) {
    categories = categories.filter(
      (item) =>
        item.name.toLowerCase().includes(value) &&
        item.description.toLowerCase().includes(value)
    );
  }
  return categories;
};

const getCategoryById = async (categoryId) => {
  const categories = await readDb(RESOURCE);
  const category = categories.find((item) => item.id === categoryId);

  return category;
};

const createCategory = async (data) => {
  const categories = await readDb(RESOURCE);
  const id = (categories.at(-1).id ?? 0) + 1;

  const newData = { id, ...data };

  categories.push(newData);

  await writeDb(RESOURCE, categories);

  return newData;
};

const updateCategory = async (categoryId, data) => {
  const categories = readDb(RESOURCE);
  const category = categories.find((item) => item.id === categoryId);

  if (category) {
    Object.assign(category, data);
    await writeDb(RESOURCE, categories);
    return category;
  }

  return null;
};
const deleteCategory = async (categoryId) => {
  const categories = await readDb(RESOURCE);
  const index = categories.findIndex((item) => item.id === categoryId);
  if (index !== -1) {
    categories.splice(index, 1);
    await writeDb(RESOURCE, categories);
  }
  return index;
};
const categoryService = {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  createCategory,
};

module.exports = categoryService;
