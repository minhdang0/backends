const express = require("express");

const userController = require("../../controllers/api/userController.js");
const attachResourceLoaders = require("@/utils/attachResourceLoaders.js");
const router = express.Router();

attachResourceLoaders(router, ["user"]);

router.get("/", userController.getList);
router.get("/:user", userController.getOne);
router.delete("/:user", userController.remove);
router.delete("/:user", userController.remove);

module.exports = router;
