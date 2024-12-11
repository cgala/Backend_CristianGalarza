import express from "express";
const router = express.Router();

// '/' HACE REFERENCIA A api/veterinarios
router.get('/', (req, res) => {
    res.send("Desde API/VETERINARIOS")
});

router.get('/login', (req, res) => {
    res.send("Desde API/VETERINARIOS")
});

export default router;