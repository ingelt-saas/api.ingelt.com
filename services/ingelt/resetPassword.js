const sendEmail = require("../../mail/passwordReset");
const godsEyeUtil = require("../../utils/ingelt");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const godsEyeResetPasswordService = {};

// send reset email
godsEyeResetPasswordService.resetEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const getGodsEyeUser = await godsEyeUtil.readByEmail(email);
        if (!getGodsEyeUser) {
            throw Error("GodsEye user not found at this email");
        } else {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            const resetLink = `https://godseye.ingeltboard.com/update-password?token=${token}`;
            // const resetLink = `http://localhost:5173/update-password?token=${token}`;
            await sendEmail(email, resetLink); // password reset email
            res.json({ message: `Password reset link send to ${email}` });
        }
    } catch (err) {
        res.status(400).send({message: err.message});
    }
}

// gods eye reset email check
godsEyeResetPasswordService.resetTokenVerify = async (req, res, next) => {
    const token = req.body.token;
    console.log(token);
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                throw Error("Verification token not valid")
            } else {
                next();
            }
        });
    } catch (err) {
        res.status(400).send({message: err.message});
    }
}

// gods eye password update
godsEyeResetPasswordService.passwordUpdate = async (req, res) => {

    const token = req.body.token;
    let password = req.body.password;

    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                throw Error("Verification token not valid")
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                let getStudent = await godsEyeUtil.readByEmail(decode.email);
                const result = await godsEyeUtil.update(getStudent.id, { password: hashedPassword });
                res.json({message: "Password change successfully !!!"});
            }
        });
    } catch (err) {
        res.status(400).send({message: err.message});
    }
}

module.exports = godsEyeResetPasswordService;