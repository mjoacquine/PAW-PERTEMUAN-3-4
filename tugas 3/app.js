require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Impor dan pasang rute
app.use("/formasi", require("./routes/formasiRoutes"));
app.use("/pemain", require("./routes/pemainRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/prediksi", require("./routes/prediksiRoutes"));

// 1. Penanganan Route Tidak Ditemukan (404)
app.all("*", (req, res, next) => {
  const err = new Error(`Endpoint ${req.originalUrl} tidak ditemukan (O_O) ERR 404`);
  err.status = 404;
  next(err); // Melempar ke Centralized Error Handler
});

// 2. Centralized Error Handler
app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Terjadi kesalahan pada server";

  if (err.name === "ValidationError") {
    status = 400;
  } else if (err.name === "CastError") {
    status = 400;
    message = `Format ${err.path} tidak valid`;
  } else if (err.code === 11000) {
    status = 400;
    message = "Data dengan nilai unik tersebut sudah ada";
  }

  if (status === 500) {
    console.error(err);
    message = "Terjadi kesalahan pada server";
  }

  res.status(status).json({
    status: status >= 500 ? "error" : "fail",
    message: message
  });
});

// 3. KONEKSI MONGOOSE & MENJALANKAN SERVER
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Terhubung ke database MongoDB (db_barcelona)");
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Gagal koneksi ke MongoDB:", err.message);
  });