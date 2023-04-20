const contactMail = require('./ingelt.com.contact');

const mailService = require('express').Router();

// contact mail service 
mailService.post('/contactForm', async (req, res) => {
    try {
        const result = await contactMail(req.body);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = mailService;