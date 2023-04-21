const mailer = require("./config/nodemailer");

const instituteMail = async (data) => {
  const options = {
    from: process.env.EMAIL || "ingeltemails@gmail.com",
    to: "partner@ingelt.com",
    subject: "board.ingelt.com Institute Registration Query",
    text: `
      Institute Name: ${data?.name}

      Institute Phone Number: ${data?.phone}

      Institute Email: ${data?.email}

      Institute Location: ${data?.location}

      IELTS Coaching Type Offered: ${data?.ieltsType}

      Instruction Medium: ${data?.instructionMedium}

      Number of Live Batches: ${data?.liveBatches}
        
        `,
  };

  try {
    return mailer.transporter.sendMail(options);
  } catch (err) {
    throw err;
  }
};

module.exports = instituteMail;
