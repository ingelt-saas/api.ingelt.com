const mailer = require('./config/nodemailer');

const contactMail = async (data) => {
    const options = {
        from: process.env.EMAIL || "ingeltemails@gmail.com",
        to: 'nish2002.sharma@gmail.com',
        subject: 'Contact Queries',
        text: `
        Name: ${data?.name}
        
        Email: ${data?.email}

        Subject: ${data?.subject}

        Message: ${data?.message}
        
        `,
    }

    try {
        return mailer.transporter.sendMail(options);
    } catch (err) {
        throw err;
    }
}

module.exports = contactMail;