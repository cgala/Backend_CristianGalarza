import { request } from "express";

const registrar = (req, res) => {

    console.log(req.body);
    res.json({msj: "registrando usuario.."});
};

const perfil = (req, res) => {
    res.json({msj: "Mostrando Perfil"})
}

export {
    registrar,
    perfil
}