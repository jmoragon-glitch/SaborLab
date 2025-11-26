const mongoose = require("mongoose");

const ingredienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    cantidad: { type: Number, required: false },
    unidad: { type: String, required: false, trim: true }
  },
  { _id: false }
);

const recetaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    ingredientes: {
      type: [ingredienteSchema],
      default: []
    },
    pasos: {
      type: [String],
      default: []
    },
    categoria: {
      type: String,
      trim: true
    },
    dificultad: {
      type: String,
      enum: ["facil", "media", "dificil"],
      default: "facil"
    },
    tiempoPreparacion: {
      type: Number, // en minutos
      required: false
    },
    porciones: {
      type: Number,
      required: false
    },
    presupuestoPorPorcion: {
      type: Number,
      required: false
    },
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: false // luego podemos hacerlo obligatorio si quieres
    },
    esPublica: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Receta = mongoose.model("Receta", recetaSchema);

module.exports = Receta;