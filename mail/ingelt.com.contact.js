const mailer = require("./config/nodemailer");

const contactMail = async (data) => {
  const options = {
    from: process.env.EMAIL || "ingeltemails@gmail.com",
    to: "ingeltmarketing@gmail.com",
    subject: "Contact Queries",
    text: `
        Name: ${data?.name}

        Phone Number: ${data?.phone}
        
        Email: ${data?.email}

        Subject: ${data?.subject}

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
