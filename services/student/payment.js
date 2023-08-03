const invoiceMail = require('../../mail/invoice.mail');
const onlineClassBookingMail = require('../../mail/online-class.mail');
const { createOrder } = require('../../razorpay/razorpay');
const stripeService = require('../../stripe/stripe');
const paymentUtil = require('../../utils/payment');
const studentUtil = require('../../utils/student');

const paymentService = require('express').Router();

// create payment intent
paymentService.post('/createPaymentIntent', async (req, res) => {
    try {
        const student = req.decoded;
        const getStudent = await studentUtil.readById(student.id);
        let amount = 0;

        if (req.body.paymentFor === 'classes') {
            amount = parseInt(process.env.LIVE_ONLINE_CLASS_FEE);
        }

        if (req.body.paymentFor === 'session') {
            amount = parseInt(process.env.SESSION_BOOKING_FEE);
        }

        if (!getStudent) {
            return res.status(404).send({ message: 'student not found' })
        }
        if (amount === 0) {
            return res.status(400).send({ message: 'Fee not found' });
        }

        const order = await createOrder({ amount });
        res.json(order);
        // const paymentIntent = await stripeService.createPaymentIntent(amount, 'Billing for ielts online classes', student);
        // res.send(paymentIntent);
    } catch (err) {
        res.status(400).send(err);
    }
});

// payment success
paymentService.post('/paymentSuccess', async (req, res) => {
    try {

        const student = req.decoded;

        req.body.studentId = student.id;
        const result = await paymentUtil.create(req.body);

        let amount = req.body.amount;
        amount = Math.ceil(amount / 100);

        // send receipt mail
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
                name: 'Live Online Classes with InGelt Board',
                price: amount,
                total: amount,
            }
        });

        // send booking mail
        await onlineClassBookingMail({ email: student.email, name: student.name });

        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = paymentService;