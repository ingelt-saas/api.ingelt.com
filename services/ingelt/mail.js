const invoiceMail = require('../../mail/invoice.mail');
const speakingSessionMail = require('../../mail/speaking-session.mail');
const studentUtil = require('../../utils/student');

const mailService = require('express').Router();

// send session invoice 
mailService.post('/session-invoice', async (req, res) => {
    try {
        let amount = req.body.amount;
        let student = req.body.student;
        student = await studentUtil.readById(student.id);

        const options = {
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
        }

        const result = await invoiceMail(options);

        // send congratulations mail
        await speakingSessionMail({ email: student.email, name: student.name });

        res.json(result)
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = mailService;