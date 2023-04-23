// Admin Authenticator
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { admin } = require("../models");

const authenticateAdmin = async (req, res) => {

  const { email, password } = req.body;

  // Check if User with email exists and fetch that user
  let adminValue = await admin.findOne({ where: { email } });

  if (adminValue) {
    adminValue = adminValue.get({ plain: true });
  }

  // If user does not exist, return error
  if (!adminValue) {
    return res.status(404).json({
      message: "Admin not found",
    });

    // If user exists, check if password is correct
  } else if (await bcrypt.compare(password, adminValue.password)) {
    // If password is correct, generate token and return it
    const token = jwt.sign(adminValue, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.status(200).json({
      message: "Admin authenticated",
      token,
    });

    // If password is incorrect, return error
  } else {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }
};

module.exports = authenticateAdmin;
