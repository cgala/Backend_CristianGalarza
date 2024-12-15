import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();

//para recibir jsons como request
app.use(express.json());

dotenv.config();

conectarDB();

// al hacer una peticion a "/api/veterinarios", se conecta al archivo  veterinarioRouters.js 
//y ejecuta los metodos http de rest definidos
app.use("/api/veterinarios",veterinarioRoutes );
app.use("/api/pacientes",pacienteRoutes );


// SI NO EXITE CONECTAR AL PUERTO 4000
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo el el puerto ${PORT}`);
});
