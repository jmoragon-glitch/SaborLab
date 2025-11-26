const express = require("express");
const router = express.Router();

const Usuario = require("../models/Usuario");

// Registro
router.post("/registro", async (req, res) => {
  try {
    const { nombreCompleto, email, password, rol } = req.body;

    if (!nombreCompleto || !email || !password) {
      return res
        .status(400)
        .json({ mensajeError: "Faltan campos obligatorios." });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res
        .status(400)
        .json({ mensajeError: "Ya existe un usuario con ese correo." });
    }

    const nuevo = await Usuario.create({
      nombreCompleto,
      email,
      password,
      rol: rol || "regular",
    });

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ mensajeError: "Credenciales inválidas." });
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: {
        _id: usuario._id,
        nombreCompleto: usuario.nombreCompleto,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
});

// GET todos
router.get("/", async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const eliminado = await Usuario.findByIdAndDelete(req.params.id);
  res.json(eliminado);
});

module.exports = router;