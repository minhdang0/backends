const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "posts";

const getAllPost = async (title) => {
  let posts = await readDb(RESOURCE);
  if (title) {
    posts = posts.filter((item) => item.title.toLowerCase().includes(title));
  }
  return posts;
};

const getPostById = async (postId) => {
  const posts = await readDb(RESOURCE);
  const post = posts.find((item) => item.id === postId);

  return post;
};

const createPost = async (data) => {
  const posts = await readDb(RESOURCE);
  const id = (posts.at(-1).id ?? 0) + 1;

  const newData = { id, ...data };

  posts.push(newData);

  await writeDb(RESOURCE, posts);

  return newData;
};
const updatePost = async (postId, data) => {
  const posts = readDb(RESOURCE);
  const post = posts.find((item) => item.id === postId);

  if (post) {
    Object.assign(post, data);
    await writeDb(RESOURCE, posts);
    return post;
  }

  return null;
};
const deletePost = async (postId) => {
  const posts = await readDb(RESOURCE);
  const index = posts.findIndex((item) => item.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
    await writeDb(RESOURCE, posts);
  }
  return index;
};
const postService = {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

module.exports = postService;
