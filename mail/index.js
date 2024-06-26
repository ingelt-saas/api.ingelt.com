const contactMail = require("./ingelt.com.contact");

const boardContactQuery = require("./board.contact.query");
const studentQuery = require("./board.student.query");
const partnerQuery = require("./board.partnership.query");
const instituteQuery = require("./board.institute.query");
const counsellingQuery = require("./board.counselling.query");
const responseEmail = require("./response.email");

const mailService = require("express").Router();

// contact mail service
mailService.post("/contactForm", async (req, res) => {
  try {
    const result = await contactMail(req.body);
    await responseEmail({ email: req.body.email, name: req.body.name });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// board mail service
mailService.post("/boardContactQuery", async (req, res) => {
  try {
    const result = await boardContactQuery(req.body);
    await responseEmail({ email: req.body.email, name: req.body.name });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

mailService.post("/studentQuery", async (req, res) => {
  try {
    const result = await studentQuery(req.body);
    await responseEmail({ email: req.body.email, name: req.body.name });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

mailService.post("/partnerQuery", async (req, res) => {
  try {
    const result = await partnerQuery(req.body);
    await responseEmail({ email: req.body.email, name: req.body.name });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

mailService.post("/instituteQuery", async (req, res) => {
  try {
    const result = await instituteQuery(req.body);
    await responseEmail({ email: req.body.email, name: req.body.name });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

mailService.post("/counsellingQuery", async (req, res) => {
  try {
    const result = await counsellingQuery(req.body);
    await responseEmail({ email: req.body.email, name: req.body.name });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = mailService;
