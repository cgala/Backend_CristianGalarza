import mongoose from "mongoose";

const VeterinarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    telefono:{
        type:String,
        default:null,
        trim:true,
    },
    web:{
        type:String,
        default:null,
    },
    confirmado:{
        type:Boolean,
        default:false,
    },
});

const Veterinario = mongoose.model("Veterinario", VeterinarioSchema);
export default Veterinario;
//trim elimina espacios al inicio y final