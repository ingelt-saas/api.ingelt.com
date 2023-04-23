const mailer = require("./config/nodemailer");

const studentMail = async (data) => {
  const options = {
    from: process.env.EMAIL || "ingeltemails@gmail.com",
    to: "student@ingelt.com",
    subject: "board.ingelt.com Student Registration Query",
    text: `
        Name: ${data?.name}

        Phone Number: ${data?.phone}

        Email: ${data?.email}

        City: ${data?.city}

        IELTS Type: ${data?.ieltsType}

        Currently: ${data?.currentlyDoing}
        
        IELTS Test Planned: ${data?.studentDuration}
        `,
  };

  try {
    return mailer.transporter.sendMail(options);
  } catch (err) {
    throw err;
  }
};

module.exports = studentMail;
