// Student Authenticator
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { student } = require("../models");

const authenticateStudent = async (req, res) => {
  const { email, password } = req.body;

  // Check if User with email exists and fetch that user
  let studentValue = await student.findAll({ where: { email } });
  studentValue = studentValue[0].dataValues;

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

module.exports = authenticateStudent;
