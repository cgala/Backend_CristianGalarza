import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from '../helpers/generarId.js';

const veterinarioSchema = new mongoose.Schema({ // <-- Aquí estaba bien en minúsculas
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    telefono: {
      type: String,
      default: null,
      trim: true,
    },
    web: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: generarId(),
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
});

// Middleware para hashear la contraseña antes de guardar
veterinarioSchema.pre('save', async function (next) { // <-- Cambio aquí
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Función para comprobar password
veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) { // <-- Cambio aquí
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = mongoose.model("Veterinario", veterinarioSchema); // <-- Cambio aquí
export default Veterinario;
