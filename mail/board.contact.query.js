const mailer = require("./config/nodemailer");

const contactMail = async (data) => {
  const options = {
    from: process.env.EMAIL || "ingeltemails@gmail.com",
    to: "contact@ingelt.com",
    subject: "board.ingelt.com Contact Query",
    text: `
        Name: ${data?.name}
        
        Email: ${data?.email}

        Message: ${data?.message}
        
        `,
  };

  try {
    return mailer.transporter.sendMail(options);
  } catch (err) {
    throw err;
  }
};

module.exports = contactMail;
