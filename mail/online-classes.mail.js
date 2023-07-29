const mailer = require('./index');

module.exports = async (data) => {
    const options = {
        from: process.env.EMAIL || "ingeltemails@gmail.com",
        to: data.email,
        subject: '',
        html: ``,
    };

    try {
        return mailer.transporter.sendMail(options);
    } catch (err) {
        throw err;
    }
}