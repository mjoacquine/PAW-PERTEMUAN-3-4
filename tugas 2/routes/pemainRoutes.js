// routes/pemainRoutes.js

const express = require("express");
const router = express.Router();
const pemainController = require("../controllers/pemainController");

// Perhatikan urutan: "/eropa" ditaruh sebelum "/:No_Punggung" 
// agar Express tidak mengira kata "eropa" sebagai sebuah parameter angka/ID.
router.get("/", pemainController.getAll);
router.get("/eropa", pemainController.getEropa);
router.get("/:No_Punggung", pemainController.getByNoPunggung);
router.post("/", pemainController.create);
router.put("/:No_Punggung", pemainController.update);
router.delete("/:No_Punggung", pemainController.remove);

module.exports = router;