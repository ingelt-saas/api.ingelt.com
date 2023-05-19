// Student Authenticator
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { student } = require("../models");
const passwordReset = require("../mail/passwordReset");
const studentUtil = require("../utils/student");

const authenticateStudent = async (req, res) => {

  const { email, password } = req.body;

  // Check if User with email exists and fetch that user
  let studentValue = await student.findOne({ where: { email } });
  // studentValue = studentValue[0].dataValues;

  if (studentValue) {
    studentValue = studentValue.get({ plain: true });
  }

  // If user does not exist, return error
  if (!studentValue) {
    return res.status(404).json({
      message: "Student not found",
    });

    // If user exists, check if password is correct
  } else if (await bcrypt.compare(password, studentValue.password)) {

    // If password is correct, generate token and return it
    const token = jwt.sign(studentValue, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.status(200).json({
      message: "Student authenticated",
      token,
    });

    // If password is incorrect, return error
  } else {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

};

// student email check
const studentEmailCheck = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await student.findOne({ where: { email: email } });
    if (user) {
      res.status(204).send({ message: 'Email already exists.' })
    } else {
      res.send({ message: 'OK' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

// student authorization
const authorizationStudent = async (req, res) => {
  try {

    const newStudent = req.body;
    const result = await studentUtil.create(newStudent);

    const token = jwt.sign(result, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.send({ message: 'Student created', token });

  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
}

// student reset email check
const studentResetEmailCheck = async (req, res) => {

  const email = req.body.email;

  try {

    const user = await student.findOne({ where: { email: email } }); // find student using email

    if (!user) { // if the student doesn't exist
      res.status(404).send({ message: 'Student not found.' });
    } else {

      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const resetlink = `${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;
      await passwordReset(email, resetlink); // password reset email
      res.send({ message: 'Successfully you got a reset mail.' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

// student confirmation code verify
const studentResetCodeVerify = async (req, res) => {
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

// student confirmation code verify
const studentResetPasswordUpdate = async (req, res) => {

  const token = req.body.token;
  let password = req.body.password;

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Verification token time failed' });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await student.update({ password: hashedPassword }, {
          where: { email: decode.email }
        });
        res.send(result);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  authenticateStudent,
  studentEmailCheck,
  authorizationStudent,
  studentResetEmailCheck,
  studentResetCodeVerify,
  studentResetPasswordUpdate
};
