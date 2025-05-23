const express = require("express");

const showtimeController = require("../../controllers/api/showtimeController.js");
const attachResourceLoaders = require("@/utils/attachResourceLoaders.js");
const router = express.Router();

attachResourceLoaders(router, ["showtime"]);

router.get("/", showtimeController.getList);
router.get("/:showtime", showtimeController.getOne);
router.post("/", showtimeController.create);
router.put("/:showtime", showtimeController.update);
router.delete("/:showtime", showtimeController.remove);

module.exports = router;
