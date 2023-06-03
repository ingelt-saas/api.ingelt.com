const sendEmail = require("../../mail/passwordReset");
const adminUtil = require("../../utils/admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const resetPasswordService = {};

// send reset email
resetPasswordService.resetEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const getAdmin = await adminUtil.readByEmail(email);
        if (!getAdmin) {
            res.status(404).json({ message: 'Admin not found at this email' });
        } else {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            const resetLink = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
            await sendEmail(email, resetLink); // password reset email
            res.json({ message: 'OK' });
        }
    } catch (err) {
        res.status(400).send(err);
    }
}

// reset email check
resetPasswordService.resetTokenVerify = async (req, res) => {
    const token = req.body.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Verification token time failed' });
            } else {
                res.send({ message: 'Successfully verify' });
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
}

// admin password
resetPasswordService.passwordUpdate = async (req, res) => {

    const token = req.body.token;
    let password = req.body.password;

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Verification token time failed' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                let getAdmin = await adminUtil.readByEmail(decode.email);
                const result = await adminUtil.update(getAdmin.id, { password: hashedPassword });
                res.json(result);
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = resetPasswordService;