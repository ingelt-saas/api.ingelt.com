const mailer = require("./config/nodemailer");

const counsellingMail = async (data) => {
  const options = {
    from: process.env.EMAIL || "ingeltemails@gmail.com",
    to: "student@ingelt.com",
    subject: "board.ingelt.com Counselling Query",
    text: `
        Name: ${data?.name}

        Phone Number: ${data?.phone}
        
        Email: ${data?.email}

        Country: ${data?.country}

        Target University: ${data?.targetUniversity}

        Target Course: ${data?.targetCourse}

        Target Intake: ${data?.targetIntake}
        
        Booked IELTS: ${data?.bookedIelts}
        `,
  };

  try {
    return mailer.transporter.sendMail(options);
  } catch (err) {
    throw err;
  }
};

module.exports = counsellingMail;
