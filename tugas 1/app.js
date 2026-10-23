// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: namaPemain
//
// Jalankan dengan:
// npm install
// npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Data pemain
let namaPemain = [
  {No_Punggung: 1,nama: "Joan_Garcia",Posisi: "goalKeeper", Kebangsaan: "uniEropa", },
  {No_Punggung: 10,nama: "Lamine_Yamal",Posisi: "rightWing",Kebangsaan: "uniEropa",},
  {No_Punggung: 5,nama: "Pau_Cubarsi",Posisi: "centerBack",Kebangsaan: "uniEropa",},
  {No_Punggung: 8, nama: "Pedri",Posisi: "centerMidfield",Kebangsaan: "uniEropa",},
  {No_Punggung: 9,nama: "Gabriel_Jesus",Posisi: "Striker",Kebangsaan: "nonEropa",},
  {No_Punggung: 11,nama: "Raphinha",Posisi: "leftWing",Kebangsaan: "nonEropa", },
];

// GET /namaPemain
// Mengambil seluruh data pemain
app.get("/namaPemain", (req, res) => {
  res.json(namaPemain);
});

// GET /namaPemain/eropa
// Mengambil pemain yang berkebangsaan Eropa
app.get("/namaPemain/eropa", (req, res) => {
  const data = namaPemain.filter(
    (pemain) => pemain.Kebangsaan === "uniEropa"
  );

  if (data.length === 0) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  res.json(data);
});

// GET /namaPemain/:No_Punggung
// Mencari pemain berdasarkan nomor punggung
app.get("/namaPemain/:No_Punggung", (req, res) => {
  const No_Punggung = parseInt(req.params.No_Punggung);

  const data = namaPemain.find(
    (pemain) => pemain.No_Punggung === No_Punggung
  );

  if (!data) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  res.json(data);
});

// POST /namaPemain
// Menambahkan pemain baru
app.post("/namaPemain", (req, res) => {
  const { No_Punggung, nama, Posisi, Kebangsaan } = req.body;

  const baru = {
    No_Punggung,
    nama,
    Posisi,
    Kebangsaan,
  };

  namaPemain.push(baru);

  res.status(201).json(baru);
});

// PUT /namaPemain/:No_Punggung
// Mengubah data pemain berdasarkan nomor punggung
app.put("/namaPemain/:No_Punggung", (req, res) => {
  const No_Punggung = parseInt(req.params.No_Punggung);

  const index = namaPemain.findIndex(
    (pemain) => pemain.No_Punggung === No_Punggung
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  namaPemain[index] = {
    ...namaPemain[index],
    ...req.body,
  };

  res.json(namaPemain[index]);
});

// DELETE /namaPemain/:No_Punggung
// Menghapus pemain berdasarkan nomor punggung
app.delete("/namaPemain/:No_Punggung", (req, res) => {
  const No_Punggung = parseInt(req.params.No_Punggung);

  const index = namaPemain.findIndex(
    (pemain) => pemain.No_Punggung === No_Punggung
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Data tidak ditemukan",
    });
  }

  namaPemain.splice(index, 1);

  res.status(204).send();
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});