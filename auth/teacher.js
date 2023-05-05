// Teacher Authenticator
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { teacher } = require("../models");

const authenticateTeacher = async (req, res) => {
  
  const { email, password } = req.body;

  // Check if User with email exists and fetch that user
  let teacherValue = await teacher.findOne({ where: { email } });

  if (teacherValue) {
    teacherValue = teacherValue.get({ plain: true });
  }

  // If user does not exist, return error
  if (!teacherValue) {
    return res.status(404).json({
      message: "Teacher not found",
    });

    // If user exists, check if password is correct
  } else if (await bcrypt.compare(password, teacherValue.password)) {
    // If password is correct, generate token and return it
    const token = jwt.sign(teacherValue, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.status(200).json({
      message: "Teacher authenticated",
      token,
    });

    // If password is incorrect, return error
  } else {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }
};

module.exports = authenticateTeacher;
