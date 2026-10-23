const mongoose = require("mongoose");

const pemainSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  noPunggung: { type: Number, required: true, unique: true },
  posisi: { type: String, required: true }, // contoh: Striker, Defender, Midfielder
  klub: { type: String, required: true },
  wilayah: { type: String, required: true }, // contoh: 'Eropa', 'Asia', dll
  formasiId: { type: mongoose.Schema.Types.ObjectId, ref: "Formasi" }, // Relasi opsional ke Formasi
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pemain", pemainSchema);