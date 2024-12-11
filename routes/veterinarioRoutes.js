import express from "express";
import {registrar, perfil} from '../controllers/veterinarioCotroller.js'
const router = express.Router();


// '/' HACE REFERENCIA A api/veterinarios
router.get('/', registrar);

router.get('/perfil', perfil);

export default router;