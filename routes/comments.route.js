const express = require("express");
const router = express.Router();
const fs = require("node:fs").promises;

const DB_PATH = "./db.json";
const RESOURCE = "comments";

const writeDb = async (resource, data) => {
  let db = {};

  try {
    const jsonDb = await fs.readFile(DB_PATH, "utf-8");
    db = JSON.stringify(jsonDb);
  } catch (error) {
    db[resource] = data;
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  }
};

const readFile = async (resource) => {
  const jsonDb = await fs.readFile(DB_PATH, "utf-8");
  const db = JSON.parse(jsonDb);
  return db[resource];
};

router.get("/", async (req, res) => {
  const comments = await readFile(RESOURCE);
  if (!comments) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: comments,
  });
});

router.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const comments = await readFile(RESOURCE);

  const comment = comments.find((item) => item.id === id);

  if (!comment) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

router.post("/", async (req, res) => {
  const comments = await readFile(RESOURCE);
  const nextId = (posts.at(-1).id ?? 0) + 1;

  const data = {
    id: nextId,
    ...req.body,
  };

  comments.push(data);

  await writeDb(RESOURCE, comments);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

router.put("/:id", async (req, res) => {
  const id = +req.params.id;
  const comments = await readFile(RESOURCE);
  const comment = comments.find((item) => item.id === id);

  if (!comment) {
    res.status(404).json({
      status: "error",
      message: "Not Found",
    });
  }

  Object.assign(comment, req.body);

  await writeDb(RESOURCE, comments);

  res.status(200).json({
    status: "success",
    message: "Successfully updated",
  });
});

router.delete("/:id", async (req, res) => {
  const id = +req.params.id;
  const comments = await readFile(RESOURCE);
  const index = comments.findIndex((item) => item.id === id);

  if (!index) {
    res.status(404).json({
      status: "error",
      message: "Not found",
    });
  }
  comments.splice(index, 1);

  res.status(204);
});

module.exports = router;
