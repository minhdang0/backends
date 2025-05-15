const fs = require("fs/promises");
const DB_PATH = "./db.json";

const readDb = async (resource) => {
  const jsonDb = await fs.readFile(DB_PATH, "utf-8");
  const db = JSON.parse(jsonDb);
  console.log(db);
  return db[resource];
};

const writeDb = async (resource, data) => {
  let db = {};

  try {
    const jsonDb = await fs.readFile(DB_PATH, "utf-8");
    db = JSON.parse(jsonDb);
  } catch (error) {}

  db[resource] = data;
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

module.exports = { readDb, writeDb };
