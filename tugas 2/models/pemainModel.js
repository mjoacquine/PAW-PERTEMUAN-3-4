// models/pemainModel.js

let namaPemain = [
  { No_Punggung: 1, nama: "Joan_Garcia", Posisi: "goalKeeper", Kebangsaan: "uniEropa" },
  { No_Punggung: 10, nama: "Lamine_Yamal", Posisi: "rightWing", Kebangsaan: "uniEropa" },
  { No_Punggung: 5, nama: "Pau_Cubarsi", Posisi: "centerBack", Kebangsaan: "uniEropa" },
  { No_Punggung: 8, nama: "Pedri", Posisi: "centerMidfield", Kebangsaan: "uniEropa" },
  { No_Punggung: 9, nama: "Gabriel_Jesus", Posisi: "Striker", Kebangsaan: "nonEropa" },
  { No_Punggung: 11, nama: "Raphinha", Posisi: "leftWing", Kebangsaan: "nonEropa" },
];

function getAll() {
  return namaPemain;
}

function getEropa() {
  return namaPemain.filter((pemain) => pemain.Kebangsaan === "uniEropa");
}

function getByNoPunggung(noPunggung) {
  return namaPemain.find((pemain) => pemain.No_Punggung === noPunggung);
}

function create(data) {
  const { No_Punggung, nama, Posisi, Kebangsaan } = data;
  const baru = { No_Punggung, nama, Posisi, Kebangsaan };
  namaPemain.push(baru);
  return baru;
}

function update(noPunggung, bodyData) {
  const index = namaPemain.findIndex((pemain) => pemain.No_Punggung === noPunggung);
  if (index === -1) return null;

  namaPemain[index] = {
    ...namaPemain[index],
    ...bodyData,
  };
  return namaPemain[index];
}

function remove(noPunggung) {
  const index = namaPemain.findIndex((pemain) => pemain.No_Punggung === noPunggung);
  if (index === -1) return false;

  namaPemain.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getEropa,
  getByNoPunggung,
  create,
  update,
  remove,
};