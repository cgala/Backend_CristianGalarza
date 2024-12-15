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
const obtenerPaciente = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes);
};

const obtenerPacientes = async (req, res) =>{};

const actualizarPaciente = async (req, res) =>{};

const eliminarPaciente = async (req, res) =>{};

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente,

};