const createPayment = require('../../instamojo/createPayment');
const invoiceMail = require('../../mail/invoice.mail');
const onlineClassBookingMail = require('../../mail/online-class.mail');
const inGeltUtil = require('../../utils/ingelt');
const couponUtil = require('../../utils/coupon');
// const { createOrder } = require('../../razorpay/razorpay');
// const stripeService = require('../../stripe/stripe');
const paymentUtil = require('../../utils/payment');
const studentUtil = require('../../utils/student');

const paymentService = require('express').Router();

// create payment intent
paymentService.post('/createPaymentIntent', async (req, res) => {
    try {
        const student = req.decoded;
        const getStudent = await studentUtil.readById(student.id);
        const inGelt = await inGeltUtil.getInGelt();

        let amount = 0;
        let purpose = '';
        let redirectUrl = '';

        if (req.body.paymentFor === 'classes') {

            let fee = parseInt(inGelt.classFee);

            // module coupon validation
            if (req.body.moduleCoupon) {
                const coupon = await couponUtil.couponValidation(req.body.moduleCoupon, 'class');
                if (coupon.validation) {
                    const couponAmount = coupon.coupon.amount;
                    fee = fee - couponAmount;
                }
            }

            amount = fee;
            purpose = 'Payment for InGelt Board Online Classes';
            redirectUrl = `https://student.ingelt.com/ielts-classes/online-classes?payment=success&amount=${amount}`;
        }

        if (req.body.paymentFor === 'module') {

            let fee = parseInt(inGelt.moduleFee);

            // module coupon validation
            if (req.body.moduleCoupon) {
                const coupon = await couponUtil.couponValidation(req.body.moduleCoupon, 'module');
                if (coupon.validation) {
                    const couponAmount = coupon.coupon.amount;
                    fee = fee - couponAmount;
                }
            }

            amount = fee;
            purpose = 'Payment for InGelt Board Modules';
            redirectUrl = `https://student.ingelt.com/ielts-preparation/modules?payment=success&amount=${amount}`;
        }

        if (req.body.paymentFor === 'session') {
            amount = parseInt(inGelt.sessionFee);
            purpose = 'Payment for InGelt Board Session';
            redirectUrl = `https://student.ingelt.com/ielts-preparation/speaking-session?payment=success&amount=${amount}`;
        }

        if (!getStudent) {
            return res.status(404).send({ message: 'student not found' })
        }
        if (amount === 0) {
            return res.status(400).send({ message: 'Fee not found' });
        }

        const order = await createPayment({
            amount,
            purpose,
            buyer_name: student.name,
            email: student.email,
            phone: student.phoneNo
        }, redirectUrl);

        // const order = await createOrder({ amount });
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
        // amount = Math.ceil(amount / 100);

        if (req.body.moduleUnlock) {
            const result = await studentUtil.unlockModule(student.id);
            return res.json(result);
        }

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

// module coupon validation
paymentService.post('/moduleCouponValidation', async (req, res) => {
    try {
        const coupon = req.body.coupon;
        const result = await couponUtil.couponValidation(coupon, 'module');
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = paymentService;