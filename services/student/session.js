const invoiceMail = require('../../mail/invoice.mail');
const speakingSessionMail = require('../../mail/speaking-session.mail');
const sessionUtil = require('../../utils/session');

const sessionService = require('express').Router();

// create
sessionService.post('/', async (req, res) => {
    try {
        const student = req.decoded;
        req.body.studentId = req.decoded.id;
        const result = await sessionUtil.create(req.body);

        let amount = req.body.amount;
        amount = Math.ceil(amount / 100);

        await invoiceMail({
            name: student.name,
            address: `${student.city}, ${student.state}, ${student.country}`,
            email: student.email,
            phoneNo: student.phoneNo,
            amount: amount,
            invoiceDate: req.body.invoiceDate,
            discount: 0,
            discountAmount: 0,
            totalAmount: amount,
            item: {
                name: '1:1 Speaking Session With Expert English Teacher',
                price: amount,
                total: amount,
            }
        });

        //send booked email
        await speakingSessionMail({ email: student.email, name: student.name });

        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// read 
sessionService.get('/', async (req, res) => {
    try {
        const result = await sessionUtil.getByStudent(req.decoded.id);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = sessionService;