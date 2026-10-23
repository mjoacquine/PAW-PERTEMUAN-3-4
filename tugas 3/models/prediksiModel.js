const mongoose = require("mongoose");

const prediksiSchema = new mongoose.Schema({
  timA: { type: String, required: true },
  timB: { type: String, required: true },
  skorPrediksi: { type: String, required: true }, // contoh: "2-1"
  akurasiPersen: { type: Number, default: 80 },
  catatanAnalisis: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prediksi", prediksiSchema);