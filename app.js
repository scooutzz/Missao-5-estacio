const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./controllers/authController");
const { verifyToken } = require("./middlewares/authMiddleware");
const {
  getAllUsers,
  getUserProfile,
  getContracts,
} = require("./services/userService");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Rotas públicas
app.use("/api/auth", authRoutes);

// Rotas protegidas com JWT
app.get("/api/users", verifyToken, (req, res) => {
  if (req.user.perfil !== "admin") return res.sendStatus(403);
  res.json({ data: getAllUsers() });
});

app.get("/api/profile", verifyToken, (req, res) => {
  const profile = getUserProfile(req.user.id);
  res.json({ profile });
});

app.get("/api/contracts/:empresa/:inicio", verifyToken, (req, res) => {
  if (req.user.perfil !== "admin") return res.sendStatus(403);
  const { empresa, inicio } = req.params;
  const result = getContracts(empresa, inicio);
  if (result) res.status(200).json({ data: result });
  else res.status(404).json({ message: "Not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
