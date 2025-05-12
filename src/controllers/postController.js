const throw404 = require("@/utils/throw404");
const { readDb, writeDb } = require("../utils/db");
const response = require("../utils/response");
const {
  getAllPost,
  getPostById,
  getIndexPost,
  createPost,
  updatePost,
  deletePost,
} = require("@/service/postService");
const RESOURCE = "posts";

exports.getAllPost = async (req, res) => {
  let searchValue = null;
  if (req.query?.title) {
    searchValue = req.query.title.trim().toLowerCase();
  }
  let posts = await getAllPost(searchValue);
  if (!posts) throw404();

  response.success(res, 200, posts);
};

exports.getOnePost = async (req, res) => {
  const id = +req.params.id;
  const post = await getPostById(id);

  if (!post) throw404();

  response.success(res, 200, post);
};

exports.createPost = async (req, res) => {
  const data = { ...req.body };

  const newData = await createPost(data);
  response.success(res, 201, newData);
};

exports.updatePost = async (req, res) => {
  const id = +req.params.id;
  const post = await updatePost(id, ...req.body);

  if (post) throw404();

  response.success(res, 200, post);
};

exports.deletePost = async (req, res) => {
  const id = +req.params.id;
  const index = await deletePost(id);
  if (index === -1) throw404();
  response.success(res, 204);
};
