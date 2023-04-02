// Student Authenticator
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { student } = require("../models");

const authenticateStudent = async (req, res) => {

  const { email, password } = req.body;

  // Check if User with email exists and fetch that user
  let studentValue = (await student.findOne({ where: { email } }))?.get({ plain: true });
  // studentValue = studentValue[0].dataValues;

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newStudent.password, salt);
    newStudent.password = hashedPassword;

    const result = (await student.create(newStudent)).get({ plain: true });

    const token = jwt.sign(result, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.send({ message: 'Student created', token });

  } catch (err) {
    res.status(400).send(err);
  }
}

// student reset email check
const studentResetEmailCheck = async (req, res) => {

  const email = req.body.email;

  const randomCodeFunc = () => {
    let chars = '0123456789';
    let result = '';
    for (let i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  let randomCode = randomCodeFunc();
  const token = jwt.sign({ email: email, code: randomCode }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  try {
    const user = await student.findOne({ where: { email: email } });
    if (!user) {
      res.status(404).send({ message: 'Student not found.' });
    } else {
      res.send({ token });
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

// student confirmation code verify
const studentResetCodeVerify = async (req, res) => {
  const token = req.body.token;
  const email = req.body.email;
  const code = req.body.code;
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Verification token time failed' });
      } else {
        if (decode.email === email && parseInt(decode.code) === parseInt(code)) {
          res.send({ message: 'Successfully verify' });
        } else {
          res.status(401).send({ message: 'Invalid Code' });
        }
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
