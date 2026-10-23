const express = require("express");
const router = express.Router();
const formasiController = require("../controllers/formasiController");

// Routing untuk /formasi
router.route("/")
  .get(formasiController.getAll)
  .post(formasiController.create);

// Routing untuk /formasi/:id
router.route("/:id")
  .get(formasiController.getById)
  .put(formasiController.update)
  .delete(formasiController.remove);

module.exports = router;