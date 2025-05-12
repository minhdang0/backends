const {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("@/service/categoryService");
const response = require("../utils/response");
const throw404 = require("@/utils/throw404");

exports.getAllCategories = async (req, res) => {
  let searchValue = null;
  if (req.query?.q) {
    searchValue = req.query.q.trim().toLowerCase();
  }

  let categories = await getAllCategories(searchValue);
  response.success(res, 200, categories);
};

exports.getOneCategory = async (req, res) => {
  const id = +req.params.id;
  const category = await getCategoryById(id);
  if (category) throw404();

  response.success(res, 200, category);
};

exports.createCategory = async (req, res) => {
  const data = { ...req.body };

  const newData = await createCategory(data);

  response.success(res, 201, newData);
};

exports.updateCategory = async (req, res) => {
  const id = +req.params.id;
  const category = await updateCategory(id, ...req.body);

  if (!category) throw404();

  response.success(res, 200, category);
};

exports.deleteCategory = async (req, res) => {
  const id = +req.params.id;
  const index = await deleteCategory(id);
  if (index === -1) throw404();

  response.success(res, 204);
};
