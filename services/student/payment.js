const stripeService = require('../../stripe/stripe');
const studentUtil = require('../../utils/student');

const paymentService = require('express').Router();

// create payment intent
paymentService.post('/createPaymentIntent', async (req, res) => {
    try {
        const student = req.decoded;
        const getStudent = await studentUtil.readById(student.id);
        let amount = 0;

        if (req.body.paymentFor === 'online') {
            amount = parseInt(process.env.LIVE_ONLINE_CLASS_FEE);
        }
        if (!getStudent) {
            return res.status(404).send({ message: 'student not found' })
        }
        if (amount === 0) {
            return res.status(400).send({ message: 'Fee not found' });
        }

        const paymentIntent = await stripeService.createPaymentIntent(amount, 'Billing for ielts online classes', student);
        res.send(paymentIntent);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = paymentService;