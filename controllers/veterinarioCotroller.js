import { request } from "express";
import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";

const registrar = async (req, res) => {
    //descontruction de req.body
    //const {nombre, email, password} = req.body;
    const { email, nombre } = req.body

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

        //ENVIAR MAIL
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });



        res.json(veterinarioGuardado);
    }catch (error){
        console.log(error);
    }

};

const perfil = (req, res) => {
    // el middleware de auth guardo la sesion del usuario u objeto usuario
    const { veterinario } = req;

    res.json({perfil: veterinario})
}

const confirmar = async(req, res) => {
    //params => url y req => body
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token: token});
    
    if (!usuarioConfirmar){
        const error= new Error("Token no valido");
        return res.status(400).json({msg: error.message});
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
    const { email, password} = req.body;

    //comprobando si existe el usuario
    const usuario = await Veterinario.findOne({email});

    if (!usuario){
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    // comprobar si el usuario esta confirmado
    if (!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message});
    }

    //revisar el password
    if (await usuario.comprobarPassword(password)){
        //autenticar con jws, le pasamos a la funcion ubicada en helpers el id del usuario
        res.json({token: generarJWT(usuario.id)});
    } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({msg: error.message});
    }
};

const olvidePasword = async (req, res) => {
    const { email } = req.body;
    
    const existeVeterinario = await Veterinario.findOne({email});
    if (!existeVeterinario){
        const error = new Error('el usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.json({msg: "Se envio un mail con las instrucciones"});

    } catch (error) {
        console.log(error);
    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Veterinario.findOne({ token });

    if(tokenValido){
        //el token es valido, existe el usuario
        res.json({msg: "Token valido y el usuario existe"});
    } else {
        const error = new Error("Token no valido");
        return req.status(400).json({msg: error.message});
    }
};


const nuevoPassword = async (req, res) => {
    const { token } = req.params; //lo que viene por url
    const { password } = req.body; //lo que el usuario escribe en el body

    const veterinario = await Veterinario.findOne({ token });

    if (!veterinario){
        const error = new Error("Hubo un error");
        return res.status(400).json({msg: error.message})
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save(); // al haber un .save que afecta a la pass, se ejecuta el middleware definido en el modelo para saber si hay modificacion de pass
        res.json({msg: "Password modificado correctamente"});

        //se elimina el token por seguridad
        // al hacer .save se ejecuta el midlleware pre y vuelve a hashear el pass del objeto antes de guardar

    } catch(error){
        console.log(error);
    }

};

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePasword,
    comprobarToken,
    nuevoPassword
}