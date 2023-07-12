const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripeService = {};

// create payment intent
stripeService.createPaymentIntent = async (amount, description, customer = {}) => {
    try {
        const stripeAmount = amount * 100;

        // // create customer
        // const stripeCustomer = await stripe.customers.create({
        //     name: customer?.name,
        //     address: {
        //         postal_code: customer?.pinCode,
        //         city: customer?.city,
        //         state: customer?.state,
        //         country: customer?.country,
        //     },
        // });

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            description: description,
            amount: stripeAmount,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return paymentIntent.client_secret;

    } catch (err) {
        throw err;
    }
}

module.exports = stripeService;