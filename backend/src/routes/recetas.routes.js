const express = require("express");
const router = express.Router();

const Receta = require("../models/Receta");

// POST /api/recetas  → Crear nueva receta
router.post("/", async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      ingredientes,
      pasos,
      categoria,
      dificultad,
      tiempoPreparacion,
      porciones,
      presupuestoPorPorcion,
      creadoPor,
      esPublica
    } = req.body;

    if (!titulo) {
      return res
        .status(400)
        .json({ mensajeError: "El campo 'titulo' es obligatorio." });
    }

    const nuevaReceta = await Receta.create({
      titulo,
      descripcion,
      ingredientes,
      pasos,
      categoria,
      dificultad,
      tiempoPreparacion,
      porciones,
      presupuestoPorPorcion,
      creadoPor,
      esPublica
    });

    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
});

// GET /api/recetas  → Listar todas (con filtros opcionales)
router.get("/", async (req, res) => {
  try {
    const { categoria, ingrediente } = req.query;

    const filtro = {};

    if (categoria) {
      filtro.categoria = { $regex: categoria, $options: "i" };
    }

    if (ingrediente) {
      // Buscar recetas que tengan un ingrediente cuyo nombre contenga ese texto
      filtro["ingredientes.nombre"] = { $regex: ingrediente, $options: "i" };
    }

    const recetas = await Receta.find(filtro).populate("creadoPor", "nombreCompleto email rol");
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
});

// GET /api/recetas/:id  → Obtener una receta por ID
router.get("/:id", async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id).populate(
      "creadoPor",
      "nombreCompleto email rol"
    );

    if (!receta) {
      return res.status(404).json({ mensajeError: "Receta no encontrada." });
    }

    res.json(receta);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
});

// PUT /api/recetas/:id  → Actualizar receta
router.put("/:id", async (req, res) => {
  try {
    const actualizada = await Receta.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!actualizada) {
      return res.status(404).json({ mensajeError: "Receta no encontrada." });
    }

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
});

// DELETE /api/recetas/:id  → Eliminar receta
router.delete("/:id", async (req, res) => {
  try {
    const eliminada = await Receta.findByIdAndDelete(req.params.id);

    if (!eliminada) {
      return res.status(404).json({ mensajeError: "Receta no encontrada." });
    }

    res.json({ mensaje: "Receta eliminada correctamente." });
  } catch (error) {
    res.status(500).json({ mensajeError: error.message });
  }
});

module.exports = router;