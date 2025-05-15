const express = require("express");

const movieController = require("../controllers/movieController.js");
const attachResourceLoaders = require("@/utils/attachResourceLoaders.js");
const router = express.Router();

attachResourceLoaders(router, ["movie"]);

router.get("/", movieController.getList);
router.get("/:movie", movieController.getOne);
router.post("/", movieController.create);
router.put("/:movie", movieController.update);
router.delete("/:movie", movieController.remove);

module.exports = router;
