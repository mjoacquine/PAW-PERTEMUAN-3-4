const Pemain = require("../models/pemainModel"); // Justera sökvägen till din modell

const MAX_LIMIT = 50;

// 1. Get All Pemain (med Filtering, Searching, Pagination, Sorting, Projection)
exports.getAll = async (req, res) => {
  const filter = {};

  // FILTERING
  if (req.query.posisi) {
    filter.posisi = req.query.posisi;
  }
  if (req.query.wilayah) {
    filter.wilayah = new RegExp(req.query.wilayah, "i");
  }
  if (req.query.klub) {
    filter.klub = new RegExp(req.query.klub, "i");
  }
  if (req.query.nama) {
    filter.nama = new RegExp(req.query.nama, "i");
  }

  // SEARCHING (Söker i namn, klubb eller position)
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    filter.$or = [
      { nama: searchRegex },
      { klub: searchRegex },
      { posisi: searchRegex }
    ];
  }

  // PAGINATION
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  const skip = (page - 1) * limit;

  // SORTING (Stöder '-' för fallande ordning, t.ex. -noPunggung)
  let sortOption = { createdAt: -1 }; // Standard-sortering
  if (req.query.sort) {
    const sortField = req.query.sort;
    if (sortField.startsWith('-')) {
      sortOption = { [sortField.substring(1)]: -1 };
    } else {
      sortOption = { [sortField]: 1 };
    }
  }

  // PROJECTION
  const projection = req.query.fields ? req.query.fields.split(",").join(" ") : "";

  // Exekvera fråga mot databasen
  const data = await Pemain.find(filter)
    .select(projection)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const total = await Pemain.countDocuments(filter);

  res.json({
    status: "success",
    results: data.length,
    page,
    limit,
    total,
    data
  });
};

// 2. Skapa ny Pemain
exports.create = async (req, res) => {
  const newPemain = await Pemain.create(req.body);
  res.status(201).json({
    status: "success",
    data: newPemain
  });
};

// 3. Hämta Pemain baserat på ID
exports.getById = async (req, res) => {
  const pemain = await Pemain.findById(req.params.id);
  if (!pemain) {
    return res.status(404).json({ status: "fail", message: "Pemain hittades inte" });
  }
  res.json({
    status: "success",
    data: pemain
  });
};

// 4. Uppdatera Pemain
exports.update = async (req, res) => {
  const updatedPemain = await Pemain.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updatedPemain) {
    return res.status(404).json({ status: "fail", message: "Pemain hittades inte" });
  }
  res.json({
    status: "success",
    data: updatedPemain
  });
};

// 5. Ta bort Pemain
exports.remove = async (req, res) => {
  const deletedPemain = await Pemain.findByIdAndDelete(req.params.id);
  if (!deletedPemain) {
    return res.status(404).json({ status: "fail", message: "Pemain hittades inte" });
  }
  res.json({
    status: "success",
    message: "Pemain har tagits bort framgångsrikt"
  });
};

// 6. Custom Route: Hämta spelare från Europa
exports.getEropa = async (req, res) => {
  const data = await Pemain.find({ wilayah: new RegExp("Eropa", "i") });
  res.json({
    status: "success",
    results: data.length,
    data
  });
};

// 7. Custom Route: Hämta spelare baserat på tröjnummer
exports.getByNoPunggung = async (req, res) => {
  const data = await Pemain.find({ noPunggung: req.params.No_Punggung });
  res.json({
    status: "success",
    results: data.length,
    data
  });
};