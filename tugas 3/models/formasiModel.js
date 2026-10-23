// models/formasiModel.js
const mongoose = require("mongoose");

const formasiSchema = new mongoose.Schema({
  namaFormasi: { type: String, required: true }, // contoh: "4-3-3", "4-4-2"
  deskripsi: { type: String },
  jumlahPemainBertahan: { type: Number, default: 4 },
  jumlahPemainTengah: { type: Number, default: 3 },
  jumlahPemainMenyerang: { type: Number, default: 3 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Formasi", formasiSchema);