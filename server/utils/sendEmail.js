const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: true,
        auth: {
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_APP_PSWD
        },
        tls: {
           rejectUnauthorized: false,
        }
    });

    // This option is for sending email
    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message
    }

    transporter.sendMail(options, function (err, info) {
        if(err){
            console.log(err)
        }
        console.log(info);
    })
}

module.exports = sendEmail;