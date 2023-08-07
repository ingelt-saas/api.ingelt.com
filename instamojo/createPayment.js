const Insta = require('instamojo-nodejs');
Insta.setKeys(process.env.INSTAMOJO_API_KEY, process.env.INSTAMOJO_AUTH_KEY);

const createPayment = (data, redirectUrl) => new Promise(async (resolve, reject) => {
    try {
        const paymentData = new Insta.PaymentData();
        paymentData.currency = 'INR';
        paymentData.setRedirectUrl(redirectUrl);

        for (let key in data) {
            paymentData[key] = data[key];
        }

        Insta.isSandboxMode(false);

        // create payment
        Insta.createPayment(paymentData, (err, response) => {
            if (err) {
                reject(err);
            } else {
                console.log(response)
                resolve(response)
            }
        })

    } catch (err) {
        reject(err);
    }
});

module.exports = createPayment;