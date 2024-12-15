import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from '../helpers/generarId.js'

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
    token: {
        type:String,
        default: generarId(),
    },
    confirmado:{
        type:Boolean,
        default:false,
    },
});

//usando middleware en mongoose, antes y despues de una accion a la base
// el next es para que mongoose valla al siguiente middleware, es como
// un pass o desestimacion
// uso funcion y no arrow porque con funcion manejo directamente el objero con this
VeterinarioSchema.pre('save', async function(next) {
    // para que a un pass ya hasheado no lo vuelva a hashear
    if(!this.isModified ("password")){
        next();
    }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

//funcion para comprobar password, con methods registramos funciones en el modelo
VeterinarioSchema.methods.comprobarPassword = async function (passwordFormulario

) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Veterinario = mongoose.model("Veterinario", VeterinarioSchema);
export default Veterinario;
//trim elimina espacios al inicio y final