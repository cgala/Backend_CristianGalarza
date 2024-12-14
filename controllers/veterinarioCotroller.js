import { request } from "express";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    //descontruction de req.body
    //const {nombre, email, password} = req.body;
    const { email } = req.body

    // prevenir  usuarios duplicados
    //finOne busca por registro  en la bd en el campo email, el email recibido por req
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

const confirmar = async(req, res) => {
    //params => url y req => body
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token: token});
    
    if (!usuarioConfirmar){
        const error= new Error("Token no valido");
        return res.status(400).json({msj: error.message});
    }

    //al existir el usuario, tengo que pisar el token por seguridad, cambiar el 
    // estado a true, eso impacta en la base y tenemos el objeto usuario "como logeado"
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;

        await usuarioConfirmar.save();

        res.json({msg: "Usuario confirmado correctamente"});
       
    } catch (error){
        console.log(error);

    }   
};

const autenticar = async  (req, res) => {
    const { email } = req.body;

    //comprobando si existe el usuario
    const usuario = await Veterinario.findOne({email});

    if (!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    }


    res.json({msg: "Autenticado..."});
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar
}