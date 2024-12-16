import Paciente from "../models/Paciente.js";


const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
        
    } catch (error) {
        console.log(error);
    }


};
//usando la variable de sesionde express  al momento que se logea el veterinario
const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    
    if(!paciente){
        return res.status(404).json({msj: 'No encontrado'});
    }

    //validamos que el id del veterinario en el objeto paciente obtenido, seal emismo que el de la sesion
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msj: "accion no permitida"});
    }
    if (paciente) {
        res.json(paciente);
    }

};

const actualizarPaciente = async (req, res) =>{
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    
    if(!paciente){
        return res.status(404).json({msj: 'No encontrado'});
    }

    //validamos que el id del veterinario en el objeto paciente obtenido, seal emismo que el de la sesion
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msj: "accion no permitida"});
    }

    // actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);

    } catch (error){
        console.log(error);
    }

};

const eliminarPaciente = async (req, res) =>{
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    
    if(!paciente){
        return res.status(404).json({msj: 'No encontrado'});
    }

    //validamos que el id del veterinario en el objeto paciente obtenido, seal emismo que el de la sesion
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msj: "accion no permitida"});
    }

    try {
        await paciente.deleteOne();
        res.json({msj: "Paciente Eliminado"});
    } catch (error){
        console.log(error);
    }

};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente,

};