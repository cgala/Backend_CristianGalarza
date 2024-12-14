import express from "express";
import {registrar, perfil, confirmar} from '../controllers/veterinarioCotroller.js'
const router = express.Router();


// '/' HACE REFERENCIA A api/veterinarios
router.post('/', registrar);
router.get('/perfil', perfil);
//:token => parametro dinamico con express
router .get('/confirmar/:token', confirmar);


export default router;