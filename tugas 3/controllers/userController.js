const User = require("../models/userModel");

const MAX_LIMIT = 100;

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.role) {
    filter.role = req.query.role;
  }

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  const sortField = req.query.sort || "createdAt";
  const projection = req.query.fields ? req.query.fields.split(",").join(" ") : "";

  const data = await User.find(filter)
    .select(projection)
    .sort({ [sortField]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await User.countDocuments(filter);

  res.json({ data, page, limit, total });
};

exports.getById = async (req, res) => {
  const data = await User.findById(req.params.id);
  if (!data) throw { status: 404, message: "Pengguna tidak ditemukan" };
  res.json(data);
};

exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

exports.update = async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) throw { status: 404, message: "Pengguna tidak ditemukan" };
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id);
  if (!data) throw { status: 404, message: "Pengguna tidak ditemukan" };
  res.status(204).send();
};