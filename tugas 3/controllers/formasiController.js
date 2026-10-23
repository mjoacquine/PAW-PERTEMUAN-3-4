// controllers/formasiController.js
const Formasi = require("../models/formasiModel");

const MAX_LIMIT = 100;

exports.getAll = async (req, res) => {
  const filter = {};
  // Diperbaiki dari 'nama' menjadi 'namaFormasi' sesuai model
  if (req.query.namaFormasi) {
    filter.namaFormasi = new RegExp(req.query.namaFormasi, "i");
  }

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  const sortField = req.query.sort || "createdAt";
  const projection = req.query.fields ? req.query.fields.split(",").join(" ") : "";

  const data = await Formasi.find(filter)
    .select(projection)
    .sort({ [sortField]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Formasi.countDocuments(filter);

  res.json({ data, page, limit, total });
};

exports.getById = async (req, res) => {
  const data = await Formasi.findById(req.params.id);
  if (!data) throw { status: 404, message: "Data formasi tidak ditemukan" };
  res.json(data);
};

exports.create = async (req, res) => {
  const formasi = await Formasi.create(req.body);
  res.status(201).json(formasi);
};

exports.update = async (req, res) => {
  const data = await Formasi.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) throw { status: 404, message: "Data formasi tidak ditemukan" };
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await Formasi.findByIdAndDelete(req.params.id);
  if (!data) throw { status: 404, message: "Data formasi tidak ditemukan" };
  res.status(204).send();
};