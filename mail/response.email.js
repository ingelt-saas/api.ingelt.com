const mailer = require("./config/nodemailer");

const responseEmail = (data) => {
    const options = {
        from: process.env.EMAIL || "ingeltemails@gmail.com",
        to: data.email,
        subject: "Acknowledgement - board.ingelt.com",
        html: `<!doctype html>
                <html lang="en-US">
                    <head>
                        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                        <title>Acknowledgement - board.ingelt.com</title>
                        <meta name="description" content="Acknowledgement - board.ingelt.com">
                        <style type="text/css">
                            a:hover {text-decoration: underline !important;}
                        </style>
                    </head>
                    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                        <!--100% body table-->
                        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                            <tr>
                                <td>
                                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                        align="center" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                              <a href="https://ingelt.com" title="logo" target="_blank">
                                                <img width="60" src="https://ingelt.com/assets/logo-87db0a64.svg" title="logo" alt="logo">
                                              </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                    style="max-width:90%;background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0 35px;">
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; margin-bottom: 16px;">
                                                                Dear ${data.name},
                                                            </p>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; margin-bottom: 16px;">
                                                            Thank you for getting in touch with us through our website. We have received your message and we appreciate your interest in our services.
                                                            </p>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; margin-bottom: 16px;">
                                                            We understand that your time is valuable, and we want to assure you that we are working diligently to review your message and respond as soon as possible. Please allow us 24 - 48 hours to respond.
                                                            </p>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; margin-bottom: 16px;">
                                                            In the meantime, we encourage you to visit our website and learn more about our services. You can also reach out to us by replying to this email if you have any further questions or concerns.
                                                            </p>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; margin-bottom: 16px;">
                                                            Once again, thank you for contacting us. We look forward to speaking with you soon.
                                                            </p>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0; margin-bottom: 16px;">
                                                            <span style="display:block;">Best regards,</span>
                                                            <span style="display: block; font-weight:600">Team InGelt Board</span>
                                                            </p>
                                                            
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                                <a href='www.board.ingelt.com'><p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.board.ingelt.com</strong></p></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--/100% body table-->
                    </body>
                </html>`,
    };

    try {
        return mailer.transporter.sendMail(options);
    } catch (err) {
        throw err;
    }
}

module.exports = responseEmail;