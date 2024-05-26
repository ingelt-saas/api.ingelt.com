const jwt = require("jsonwebtoken");

  module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // const token = req.cookies.token;

    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: err });
      } else {
        req.decoded = decoded;
        next(); // if token is valid then call next
      }
    });
  } catch (err) {
    console.log("UNAUTHORIZED");
    res.status(400).send(err);
  }
};
