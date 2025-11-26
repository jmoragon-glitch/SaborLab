const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombreCompleto: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      enum: ["regular", "chef", "admin"],
      default: "regular",
    },
    activo: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);