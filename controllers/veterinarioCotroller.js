import { request } from "express";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    //descontruction de req.body
    //const {nombre, email, password} = req.body;
    const { email } = req.body

    // prevenir  usuarios duplicados
    //finOne busca por registro  en la bd
    const existeUsuario = await Veterinario.findOne({email:email});

    if (existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }

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