import express from "express";
import {registrar, perfil, confirmar, autenticar, olvidePasword, comprobarToken, nuevoPassword, totalVeterinarios} from '../controllers/veterinarioCotroller.js'
const router = express.Router();

import checkAuth from "../middleware/authMiddleware.js";

//                  AREA PUBLICA                      //
// '/' HACE REFERENCIA A api/veterinarios
router.post('/', registrar);
//:token => parametro dinamico con express
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePasword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);
router.get('/total', totalVeterinarios);


//                  AREA PRIVADA                     //
// entra al perfil, ejecuta la funcion del middleware y luego perfil
router.get('/perfil', checkAuth, perfil);


export default router;