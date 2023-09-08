const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioVerifiedNumber = process.env.TWILIO_VERIFIED_NUMBER;

const client = require('twilio')(accountSid, authToken);

function sendSMS(to, body) {
  return client.messages
    .create({
      from: twilioVerifiedNumber,
      body,
      to
    })
}


module.exports = {
  sendSMS
}
