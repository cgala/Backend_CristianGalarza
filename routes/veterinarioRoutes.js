import express from "express";
import {registrar, perfil, confirmar, autenticar} from '../controllers/veterinarioCotroller.js'
const router = express.Router();

import checkAuth from "../middleware/authMiddleware.js";

// '/' HACE REFERENCIA A api/veterinarios
router.post('/', registrar);
//:token => parametro dinamico con express
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);


// entra al perfil, ejecuta la funcion del middleware y luego perfil
router.get('/perfil', checkAuth, perfil);


export default router;