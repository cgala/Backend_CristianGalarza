import mongoose from 'mongoose';

const pacienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
    },
    propietario: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    fecha:{
        type: Date,
        require: true,
        default: Date.now(),
    },
    sintomas:{
        type: String,
        require: true,
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario' //igual al nombre del modelo al cual me quiero relacionar
    },
    },
    {
        //agrega la fecha de creacion y modificacion
        timestamps:true,
});

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;