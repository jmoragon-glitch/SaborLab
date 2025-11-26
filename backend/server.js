const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Conexión a la base de datos
const conectarDB = require("./src/config/db");

// Rutas
const usuariosRoutes = require("./src/routes/usuarios.routes");
const recetasRoutes = require("./src/routes/recetas.routes");

const app = express();

// 🔌 Conectar a MongoDB
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (temporal)
app.use(express.static(path.join(__dirname, "../frontend")));

// Usar rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/recetas", recetasRoutes);


// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor funcionando en http://localhost:${PORT}`);
});