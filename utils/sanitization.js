function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9_-]/g, "");
}

function hasCRLF(input) {
  return /[\r\n]/.test(input);
}

module.exports = { sanitizeInput, hasCRLF };
