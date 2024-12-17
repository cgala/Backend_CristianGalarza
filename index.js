import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();

//para recibir jsons como request
app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = ["http://localhost:5173"];

{/*origin: Representa el dominio de origen desde donde se hizo la petición.
    callback: Es una función que debes ejecutar para indicar si permites o deniegas el acceso. */}
const corsOption = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            //el origin del request esta permitido
            callback(null, true)
        } else {
            callback(new Error ('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOption));

// al hacer una peticion a "/api/veterinarios", se conecta al archivo  veterinarioRouters.js 
//y ejecuta los metodos http de rest definidos
app.use("/api/veterinarios",veterinarioRoutes );
app.use("/api/pacientes",pacienteRoutes );


// SI NO EXITE CONECTAR AL PUERTO 4000
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo el el puerto ${PORT}`);
});
