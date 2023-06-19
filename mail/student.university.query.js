const mailer = require('./config/nodemailer');

const ShortlistUniversityMail = async (data) => {
    try {
        const options = {
            from: process.env.EMAIL || "ingeltemails@gmail.com",
            to: "student@ingelt.com",
            subject: "Student Shortlist University Query",
            text: `
        ID: ${data.id}

        Name: ${data.name}

        Phone Number: ${data.phoneNo}

        Father Name: ${data.fathersName}

        Email: ${data.email}

        City: ${data.city}

        State: ${data.state}

        Interested Country: ${data.interestedCountry}

        `,
        };

        return mailer.transporter.sendMail(options);

    } catch (err) {
        throw err;
    }
}


module.exports = ShortlistUniversityMail;