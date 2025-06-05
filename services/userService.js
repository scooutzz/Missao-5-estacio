const { users } = require("../data/users");
const { sanitizeInput, hasCRLF } = require("../utils/sanitization");

function getAllUsers() {
  return users;
}

function getUserProfile(id) {
  return users.find((u) => u.id === id);
}

function getContracts(empresa, inicio) {
  if (hasCRLF(empresa) || hasCRLF(inicio)) return null;
  empresa = sanitizeInput(empresa);
  inicio = sanitizeInput(inicio);
  // Simula resultado de banco
  return [{ empresa, inicio, contrato: "Contrato XPTO" }];
}

module.exports = { getAllUsers, getUserProfile, getContracts };
