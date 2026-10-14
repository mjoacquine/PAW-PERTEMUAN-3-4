// app.js

const express = require("express");
const app = express();
const PORT = 3000;

// Import Routes
const pemainRoutes = require("./routes/pemainRoutes");

// Middleware
app.use(express.json());

// Hubungkan Route Utama
app.use("/namaPemain", pemainRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});