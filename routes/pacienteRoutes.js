import express from "express";
const router = express.Router();
import { agregarPaciente, obtenerPaciente, obtenerPacientes, actualizarPaciente, eliminarPaciente } from "../controllers/pacienteController.js";
import checkAuth from '../middleware/authMiddleware.js';


//protejo la ruta con el middleware checkAuth, obtengo la sesion del veterinario y la puedo usar en 
// las funciones siguientes
router.post('/', checkAuth, agregarPaciente);
router.get('/', checkAuth, obtenerPacientes);

router. get('/:id', checkAuth, obtenerPaciente);
router. put('/:id', checkAuth, actualizarPaciente);
router. delete('/:id', checkAuth, eliminarPaciente);



export default router;