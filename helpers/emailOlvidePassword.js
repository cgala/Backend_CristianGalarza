import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
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
        subject: "Reestablece tu Password",
        text:"Reestablece tu Password",
        html:`<p>Hola: ${nombre}, solicitaste reestablecer tu Password</p>

        <p>Sigue el siguiente enlace para generar tu nueva contraseña

        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a></p>

        <p>Si no creaste esta cuenta, desetima el mensaje</p>
        `
    });
    console.log("Mensaje enviado");
};

export default emailOlvidePassword;