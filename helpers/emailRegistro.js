import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    // pego el transport de mailtrap
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

    //console.log(datos);
    const { email, nombre, token }= datos;

    //ENVIAR EMAIL
    const info = await transport.sendMail({
        from: "Veterianaria UAI",
        to: email,
        subject: "Comprueba tu cuenta en Veterinaria UAI",
        text:"Comprueba tu cuenta en Veterinaria UAI",
        html:`<p>Hola: ${nombre}, comprueba tu cuenta en Veterinaria UAI</p>

        <p>Tu cuenta ya esta lista, compruebala en el siguiente enlace

        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>

        <p>Si no creaste esta cuenta, desetima el mensaje</p>
        `
    });
    console.log("Mensaje enviado");
};

export default emailRegistro;