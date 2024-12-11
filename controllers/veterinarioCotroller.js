import { request } from "express";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    //descontruction de req.body
    //const {nombre, email, password} = req.body;
    try{
        //guardar un nuevo Veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        res.json(veterinarioGuardado);
    }catch (error){
        console.log(error);
    }

};

const perfil = (req, res) => {
    res.json({msj: "Mostrando Perfil"})
}

export {
    registrar,
    perfil
}