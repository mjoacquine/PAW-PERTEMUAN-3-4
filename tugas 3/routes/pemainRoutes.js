const express = require("express");
const router = express.Router();
const pemainController = require("../controllers/pemainController"); // sesuaikan nama file controller pemainmu

// Route Pemain
router.get("/", pemainController.getAll);
router.post("/", pemainController.create);

router.get("/eropa", pemainController.getEropa);
router.get("/no-punggung/:No_Punggung", pemainController.getByNoPunggung);

router.get("/:id", pemainController.getById);
router.put("/:id", pemainController.update);
router.delete("/:id", pemainController.remove);

module.exports = router;