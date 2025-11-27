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

// Endpoint POST: Login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validación básica de entrada
  if (!email || !password) {
    return res
      .status(400)
      .json({ mensajeError: "Los campos 'email' y 'password' son obligatorios" });
  }

  try {
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      // No revelamos si el problema es email o password
      return res
        .status(401)
        .json({ mensajeError: "Credenciales inválidas" });
    }

    // ⚠️ Asumiendo password en texto plano en la BD
    if (usuario.password !== password) {
      return res
        .status(401)
        .json({ mensajeError: "Credenciales inválidas" });
    }

    // Construimos el objeto de respuesta sin password
    const usuarioRespuesta = {
      id: usuario._id,
      nombreCompleto: usuario.nombreCompleto, // ajusta al nombre real de tu campo
      email: usuario.email,                   // o usuario.correo, si así se llama
      rol: usuario.rol || "regular"          // por si no tiene rol aún
    };

    return res.json(usuarioRespuesta);
  } catch (error) {
    console.error("Error en /api/usuarios/login:", error);
    return res
      .status(500)
      .json({ mensajeError: "Error interno del servidor" });
  }
});


module.exports = router;