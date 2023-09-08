const smsOtpService = require('express').Router();
const { sendSMS } = require('../../sms');

const mobileVerify = {};

smsOtpService.post('/', async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    if (mobileVerify[mobileNumber]) {
      return res.send({
        message: "Kindly wait for 3 minutes before trying again.",
        status: false
      })
    }

    //generate 6 digit otp
    const min_number = 100000;
    const max_number = 999999;
    const otp = Math.floor(Math.random() * (max_number - min_number + 1)) + min_number;
    mobileVerify[mobileNumber] = otp;

    setTimeout(() => {
      delete mobileVerify[mobileNumber];
    }, 180 * 1000); //3 minute

    await sendSMS(mobileNumber, `Your OTP for sign up in Ingelt Board is ${otp}`);
    res.send({
      message: "OTP sent, only valid for 3 minutes",
      status: true
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
      status: false
    });
  }
})

smsOtpService.post('/verify-otp', async (req, res, next) => {
  const { otp, phoneNo } = req.body;
  try {
    if (mobileVerify[phoneNo] === otp) {
      delete mobileVerify[phoneNo];
      res.send({
        message: "Verification Successful",
        status: true
      });
    } else {
      throw Error("Your OTP has been Expired");
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
      status: false
    });
  }
})


const verifyOTPController = async (req, res, next) => {
  console.log(req.body);
  const { otp, phoneNo } = req.body;
  try {
    if (mobileVerify[phoneNo] === parseInt(otp)) {
      delete mobileVerify[phoneNo];
      next();
    } else {
      throw Error("Your OTP has been Expired");
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
      status: false
    });
  }
}


module.exports = { smsOtpService, verifyOTPController };