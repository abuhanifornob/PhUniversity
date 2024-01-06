import nodemailer from "nodemailer";

import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production", // `true` for port 465, `false` for all other ports
    auth: {
      user: "hanifcse991@gmail.com",
      pass: "exyt wdpd eplz fyzc",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  await transporter.sendMail({
    from: "hanifcse991@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset Your Password Within 10 Minuts", // Subject line
    text: "Please Click This Link", // plain text body
    html, // html body
  });

  //   console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
