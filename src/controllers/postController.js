const fs = require("node:fs").promises;

const DB_PATH = "./db.json";
const RESOURCE = "posts";

const writeDb = async (resource, data) => {
  let db = {};

  try {
    const jsonDb = await fs.readFile(DB_PATH, "utf-8");
    db = JSON.parse(jsonDb);
  } catch (error) {}

  db[resource] = data;

  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

const readDb = async (resource) => {
  const jsonDb = await fs.readFile(DB_PATH, "utf-8");
  const db = JSON.parse(jsonDb);
  console.log(db);
  return db[resource];
};

exports.getAllPost = async (req, res) => {
  let posts = await readDb(RESOURCE);
  if (!posts) {
    res.status(404).json({
      status: "error",
      message: "Not Found",
    });
    return;
  }

  if (req.query?.title) {
    const searchValue = req.query.title.trim().toLowerCase();
    if (searchValue) {
      posts = posts.filter((item) =>
        item.title.toLowerCase().includes(searchValue)
      );
    }
  }

  res.status(200).json({
    status: "success",
    data: posts,
  });
};

exports.getOnePost = async (req, res) => {
  const id = +req.params.id;
  const posts = await readDb(RESOURCE);
  console.log(posts);
  const post = posts.find((item) => item.id === id);

  if (!post) {
    res.status(404).json({
      status: "error",
      message: "Resource notfound",
    });

    return;
  }

  res.status(200).json({
    status: "success",
    data: post,
  });
};

exports.createPost = async (req, res) => {
  const posts = await readDb(RESOURCE);
  const nextId = (posts.at(-1).id ?? 0) + 1;
  const data = { id: nextId, ...req.body };

  posts.push(data);

  await writeDb(RESOURCE, posts);

  res.status(201).json({
    status: "success",
    data: data,
  });
};

exports.updatePost = async (req, res) => {
  const posts = await readDb(RESOURCE);
  const post = posts.find((post) => post.id === +req.params.id);

  if (!post) {
    res.status(404).json({
      status: "error",
      message: "Resource notfound.",
    });
    return;
  }

  Object.assign(post, req.body);

  await writeDb(RESOURCE, posts);

  res.status(200).json({
    status: "success",
    data: post,
  });
};

exports.deletePost = async (req, res) => {
  const posts = await readDb(RESOURCE);
  const id = +req.params.id;
  const index = posts.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });

    return;
  }

  posts.splice(index, 1);

  await writeDb(RESOURCE, posts);

  return res.status(204).json();
};
