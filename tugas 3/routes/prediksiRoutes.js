const express = require("express");
const router = express.Router();
const prediksiController = require("../controllers/prediksiController");

router.get("/", prediksiController.getAll);
router.get("/:id", prediksiController.getById);
router.post("/", prediksiController.create);
router.put("/:id", prediksiController.update);
router.delete("/:id", prediksiController.remove);

module.exports = router;