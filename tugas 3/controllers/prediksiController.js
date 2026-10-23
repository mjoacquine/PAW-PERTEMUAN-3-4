const Prediksi = require("../models/prediksiModel");
const MAX_LIMIT = 100;

const getAll = async (req, res) => {
  const filter = {};
  
  if (req.query.timA) filter.timA = new RegExp(req.query.timA, "i");
  if (req.query.timB) filter.timB = new RegExp(req.query.timB, "i");

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  const skip = (page - 1) * limit;

  let sortOption = { createdAt: -1 };
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sortOption = { [parts[0]]: parts[1] === 'desc' ? -1 : 1 };
  } else if (req.query.sort) {
    const sortField = req.query.sort;
    sortOption = sortField.startsWith('-') ? { [sortField.substring(1)]: -1 } : { [sortField]: 1 };
  }

  const projection = req.query.fields ? req.query.fields.split(",").join(" ") : "";

  const data = await Prediksi.find(filter)
    .select(projection)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const totalData = await Prediksi.countDocuments(filter);
  const totalPages = Math.ceil(totalData / limit) || 1;

  res.json({
    status: "success",
    data,
    pagination: {
      totalData,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
};

const getById = async (req, res) => {
  const data = await Prediksi.findById(req.params.id);
  if (!data) throw { status: 404, message: "Data prediksi tidak ditemukan" };
  res.json({ status: "success", data });
};

const create = async (req, res) => {
  const prediksi = await Prediksi.create(req.body);
  res.status(201).json({ status: "success", data: prediksi });
};

const update = async (req, res) => {
  const data = await Prediksi.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) throw { status: 404, message: "Data prediksi tidak ditemukan" };
  res.json({ status: "success", data });
};

const remove = async (req, res) => {
  const data = await Prediksi.findByIdAndDelete(req.params.id);
  if (!data) throw { status: 404, message: "Data prediksi tidak ditemukan" };
  res.status(204).send();
};

// WAJIB ADA: Ekspor modul lengkap agar tidak bernilai undefined di file Route
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};