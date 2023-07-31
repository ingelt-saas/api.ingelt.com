const Razorpay = require('razorpay');


// create a instance
const instance = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
});


exports.createOrder = ({ amount }) => new Promise((resolve, reject) => {
    try {

        amount = amount * 100;

        // create a order
        instance.orders.create({
            amount: amount,
            currency: 'INR',
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });

    } catch (err) {
        reject(err);
    }
});