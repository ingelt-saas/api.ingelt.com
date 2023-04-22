const mailer = require("./config/nodemailer");

const partnershipMail = async (data) => {
  const options = {
    from: process.env.EMAIL || "ingeltemails@gmail.com",
    to: "partner@ingelt.com",
    subject: "board.ingelt.com Institute Partnership Query",
    text: `
        Name: ${data?.name}

        Organization Name: ${data?.organizationName}

        Phone Number: ${data?.phone}
        
        Email: ${data?.email}

        Address: ${data?.address}

        Referred Through: ${data?.reference}
        
        `,
  };

  try {
    return mailer.transporter.sendMail(options);
  } catch (err) {
    throw err;
  }
};

module.exports = partnershipMail;
