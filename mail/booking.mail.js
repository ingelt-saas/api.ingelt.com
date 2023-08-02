const mailer = require('./config/nodemailer');

// Congratulations, Your Speaking Session is Successfully Booked! - InGelt Board
{/* <p style=" margin: 0; margin-top: 0.4rem;">Due date: <strong>${dueDate}</strong></p> */ }

const bookingMail = async ({ name, phoneNo, address, email, invoiceDate, dueDate, amount, totalAmount, discount, discountAmount, item }) => {
    const options = {
        from: process.env.EMAIL || "ingeltemails@gmail.com",
        to: email,
        subject: 'Here is your Invoice - InGelt Board',
        html: `<!doctype html>
            <html lang="en-US">
            
            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <title>Here is your Invoice - InGelt Board</title>
                <meta name="description" content="Here is your Invoice - InGelt Board">
                <script src="https://kit.fontawesome.com/f43ff249ef.js" crossorigin="anonymous"></script>
                <style type="text/css">
                    a:hover {
                        text-decoration: underline !important;
                    }
            
                    * {
                        font-family: 'Inter', sans-serif !important;
                    }
                </style>
            </head>
            
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                <!--100% body table-->
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                    style="@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap); font-family: 'Inter', sans-serif !important;">
                    <tr>
                        <td>
                            <table
                                style="background-color: #fff; padding: 1.5rem; max-width:670px;  margin: 1rem auto; border-radius: 1.2rem; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                                width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 1rem 1rem; background-color: #001E43; border-radius: 1.2rem;">
                                        <table>
                                            <tr>
                                                <td>
                                                    <img src='https://student.ingelt.com/static/media/logo.f48052cec74f4b051505.webp'
                                                        alt='InGelt Logo' style="border-radius: 1rem; width:100%" />
                                                </td>
                                                <td style="color: #f2f3f8; padding: 0rem 1rem; vertical-align:baseline;">
                                                    <h3 style="margin: 0;">InGelt Board</h3>
                                                    <p style="margin: 0; margin-top: 0.6rem;">
                                                        <a style="font-size: 0.8rem; color: #fff;" href='http://www.ingeltboard.com'
                                                            target="_blank">www.ingeltboard.com</a>
                                                    </p>
                                                    <p style="margin: 0; margin-top: 0.6rem;">
                                                        <a style="font-size: 0.8rem; color: #fff; text-decoration: none;"
                                                            href='tel:+919205752929'>+91 920 575 2929</a>
                                                    </p>
                                                </td>
                                                <td style="vertical-align:baseline; padding: 0rem 1rem;">
                                                    <p
                                                        style="white-space: nowrap; font-size: 0.8rem; margin: 0; color: #fff; line-height: 1.5rem;">
                                                        5A 68, Cloud 9, Vaishali, <br /> Ghaziabad, 201019
                                                    </p>
                                                </td>
                                                <td style="vertical-align:baseline;">
                                                    <p
                                                        style="margin: 0; font-weight: 600; color: #001E43; background-color: white; padding: 0.4rem 0.7rem; height: fit-content; border-radius: 9999px; font-size: 0.8rem;">
                                                        02:#Invoice_No</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table style="padding: 0rem 2rem; width: 100%;">
                                            <tr>
                                                <td style="border-right: 1px solid #EBEFF6;">
                                                    <h3 style="margin: 0; margin-bottom:0.6rem;">
                                                        <i class="fa-solid fa-user"></i> Bill To:
                                                    </h3>
                                                </td>
                                                <td style="padding-left: 1rem;">
                                                    <h3 style="margin: 0; margin-bottom:0.6rem;">
                                                        <i class="fa-solid fa-calendar-days"></i> Date:
                                                    </h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: baseline; border-right: 1px solid #EBEFF6;">
                                                    <h3 style=" margin: 0;">${name}</h3>
                                                    <p style="margin: 0; margin-top: 0.4rem;">${address}</p>
                                                    <p style="margin: 0; margin-top: 0.4rem;">${phoneNo}</p>
                                                    <p style="margin: 0; margin-top: 0.4rem;">${email}</p>
                                                </td>
                                                <td style="vertical-align: baseline; padding-left: 1rem;">
                                                    <p style="margin: 0; margin-top: 0.4rem;">Invoice date: <strong>${invoiceDate}</strong></p>
                                                    
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table
                                            style="width: 100%; border:1px solid #EBEFF6; border-radius: 1.2rem; padding: 1.5rem; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="padding-bottom: 1rem; border-bottom: 1px solid #EBEFF6;">
                                                    <p
                                                        style="background-color:#E3EFFF; border-radius: 9999px; padding: 0.3rem 0.6rem; margin: 0; width: fit-content; font-weight: 600;">
                                                        Particular
                                                    </p>
                                                </td>
                                                <td style="padding-bottom: 1rem; border-bottom: 1px solid #EBEFF6;">
                                                    <p
                                                        style="background-color:#E3EFFF; border-radius: 9999px; padding: 0.3rem 0.6rem; margin: 0; width: fit-content; font-weight: 600;">
                                                        <i class="fa-solid fa-money-check-dollar"></i>
                                                        Price
                                                    </p>
                                                </td>
                                                <td style="padding-bottom: 1rem; border-bottom: 1px solid #EBEFF6;">
                                                    <p
                                                        style="background-color:#E3EFFF; border-radius: 9999px; padding: 0.3rem 0.6rem; margin: 0; width: fit-content; font-weight: 600;">
                                                        <i class="fa-solid fa-sack-dollar"></i>
                                                        Total
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 1rem; vertical-align: baseline;">
                                                    <h4 style="font-weight: 700; margin: 0;">${item.name}</h4>
                                                </td>
                                                <td style="padding-top: 1rem; vertical-align: baseline;">
                                                    <h4 style="font-weight: 500; margin: 0;">Rs. ${item.price}</h4>
                                                </td>
                                                <td style="padding-top: 1rem; vertical-align: baseline;">
                                                    <h4 style="margin: 0;">Rs. ${item.total}</h4>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                       <div
                                            style="background-color: #001E43; border-radius: 1.2rem; padding: 1rem 1rem; margin-left: auto; box-shadow:0 6px 18px 0 #00000054; width: fit-content;">
                                            <table style="background-color: #001E43 !important; border-collapse: collapse;">
                                                <tr>
                                                    <td
                                                        style="padding: 0.8rem 0rem; border-bottom: 1px solid #FFFFFF;  color: #FFFFFF;">
                                                        <strong>Original Price</strong>
                                                    </td>
                                                    <td style="width: 30px; border-bottom: 1px solid #FFFFFF;"></td>
                                                    <td
                                                        style="padding: 0.8rem 0rem; border-bottom: 1px solid #FFFFFF; text-align: end; color: #FFFFFF;">
                                                        Rs. ${amount}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="padding: 0.8rem 0rem; border-bottom: 1px solid #FFFFFF;   color: #FFFFFF;">
                                                        <strong>Discount (${discount}%)</strong>
                                                    </td>
                                                    <td style="width: 30px; border-bottom: 1px solid #FFFFFF;"></td>
                                                    <td
                                                        style="padding: 0.8rem 0rem; border-bottom: 1px solid #FFFFFF; text-align: end; color: #FFFFFF;">
                                                        Rs. ${discountAmount}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top: 0.8rem; color: #FFFFFF;">
                                                        <strong>Invoice Total</strong>
                                                    </td>
                                                    <td style="width: 30px;"></td>
                                                    <td style="padding-top: 0.8rem; color: #FFFFFF; text-align: end;">
                                                        <h2 style="margin: 0;">Rs. ${totalAmount}</h2>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table style="width: 100%;">
                                            <tr>
                                                <td>
                                                    <h4 style="margin: 0; margin-bottom: 0.5rem;">InGelt Board</h4>
                                                    <p style="margin: 0; margin-bottom: 0.4rem;">
                                                        <a style="color: #868DA6;"
                                                            href="www.ingeltboard.com">www.ingeltboard.com</a>
                                                    </p>
                                                    <p style="margin: 0; color: #868DA6;">
                                                        <a style="color: #868DA6;"
                                                            href="mailto:contact@ingeltboard.com">contact@ingeltboard.com</a>
                                                        / <a style="color: #868DA6;" href="tel:+919205752929">+91 920 575 2929</a>
                                                    </p>
            
                                                </td>
                                                <td style="text-align: end; vertical-align: bottom;">
                                                    <img src='https://student.ingelt.com/static/media/mail-bottom.cf4738c5078af160a26393a14ad250fb.svg' alt='' style="width:auto; height:auto;"/>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
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

module.exports = bookingMail;