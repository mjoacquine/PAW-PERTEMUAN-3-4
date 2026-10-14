// controllers/pemainController.js

const pemainModel = require("../models/pemainModel");

exports.getAll = (req, res) => {
  res.json(pemainModel.getAll());
};

exports.getEropa = (req, res) => {
  const data = pemainModel.getEropa();
  if (data.length === 0) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }
  res.json(data);
};

exports.getByNoPunggung = (req, res) => {
  const noPunggung = parseInt(req.params.No_Punggung);
  const data = pemainModel.getByNoPunggung(noPunggung);

  if (!data) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }
  res.json(data);
};

exports.create = (req, res) => {
  const baru = pemainModel.create(req.body);
  res.status(201).json(baru);
};

exports.update = (req, res) => {
  const noPunggung = parseInt(req.params.No_Punggung);
  const updatedData = pemainModel.update(noPunggung, req.body);

  if (!updatedData) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }
  res.json(updatedData);
};

exports.remove = (req, res) => {
  const noPunggung = parseInt(req.params.No_Punggung);
  const success = pemainModel.remove(noPunggung);

  if (!success) {
    return res.status(404).json({ message: "Data tidak ditemukan" });
  }
  res.status(204).send();
};