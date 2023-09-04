const mailer = require('./config/nodemailer');

const studentRegisteredMail = async (name, email) => {
    try {
        const options = {
            from: process.env.EMAIL || "ingeltemails@gmail.com",
            to: email,
            subject: 'Congratulations on your Successful Registration - InGelt Board',
            html: `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Congratulations, Your Speaking Session is Successfully Booked! - InGelt Board</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap); font-family: 'Inter', sans-serif !important;">
                        <tr>
                            <td>
                                <table
                                    style="background-color: #fff; max-width:600px; margin: 1rem auto; border-radius: 1.2rem; overflow: hidden; border-collapse: collapse;">
                                    <tr>
                                        <td>
                                            <img src="https://i.ibb.co/tZyM58J/Rectangle-21357.png" border="0" alt=""
                                                style="width: 100%; height: auto;" />
                                            <div
                                                style="width: fit-content; margin-left: auto; margin-right: auto; position: relative; z-index: 10; transform: translateY(-50%);">
                                                <span
                                                    style="position: absolute; top: 0; left: 0; border-radius: 9999px; background-color: #00000040; width: 100%; height: 100%; z-index: -1; filter: blur(11px);"></span>
                                                <img src='https://student.ingelt.com/static/media/logo.f48052cec74f4b051505.webp'
                                                    alt='InGelt Logo' style="border-radius:9999px; width:100px; z-index: 10;" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table
                                                style="padding:0 3rem; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                                                width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td>
                                                        <h1
                                                            style="margin: 0; color:#242052; display: flex; align-items: center; gap: 1rem;">
                                                            Congratulations
                                                            <img width="34" height="34"
                                                                src="https://img.icons8.com/emoji/48/party-popper.png"
                                                                alt="party-popper" />
                                                        </h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h4 style="margin: 0; margin-bottom: 0.5rem;">Dear ${name}</h4>
                                                        <p style="margin: 0; color:#242052; font-weight: 500;">
                                                            You have successfully registered with InGelt Board in your Study Abroad Journey.
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr> 
                                                    <td>
                                                        <p style="font-weight: 600; margin: 0;">
                                                            Explore the <a style="text-decoration:underline;color:#242052;"
                                                                href="https://student.ingelt.com">InGelt Board
                                                                Student App</a> now and start learning and preparing!
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p style="font-weight: 400; margin: 0;">For any queries, contact us at +91 920
                                                            586 6744</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div
                                                style="background-color: white; border-radius: 1.2rem; position: relative; margin: 0 2rem; z-index: 1; transform: translateY(50%);">
                                                <span
                                                    style="position: absolute; top: 0; left: 0; border-radius: 1.2rem; background-color: #00000040; width: 100%; height: 100%; z-index: -1; filter: blur(11px);"></span>
                                                <h3
                                                    style="margin: 0; text-align: center;  padding: 2rem 0.5rem; background-color: white; border-radius: 1.2rem;">
                                                    Registered Email :-
                                                    <span style="font-weight: 400;">${email}</span>
                                                </h3>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px; background-color: #001E43;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #001E43; padding-bottom: 2rem;">
                                            <p style="margin: 0; display: flex; justify-content: center; gap: 1rem;">
                                                <a style="cursor: pointer;"
                                                    href="https://web.facebook.com/profile.php?id=100091956557360">
                                                    <img width="36" height="36" src="https://img.icons8.com/color/48/facebook-new.png"
                                                        alt="facebook-new" />
                                                </a>
                                                <a style="cursor: pointer;" href="https://www.linkedin.com/company/ingeltboardapp/">
                                                    <img width="36" height="36" src="https://img.icons8.com/color/48/linkedin.png"
                                                        alt="linkedin" />
                                                </a>
                                                <a style="cursor: pointer;" href="https://www.instagram.com/ingeltboard/">
                                                    <img width="36" height="36"
                                                        src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" />
                                                </a>
                                                <a style="cursor: pointer;" href="https://twitter.com/ingeltboard">
                                                    <img width="36" height="36" src="https://img.icons8.com/color/48/twitter--v3.png"
                                                        alt="twitter--v3" />
                                                </a>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style=" background-color: #001E43; padding: 1.3rem 1rem; border-top: 1px solid #f2f3f8;">
                                            <p style="display: flex; margin: 0; justify-content: space-between; color: #f2f3f8;">
                                                <span>@2023 InGelt All Rights Reserved.</span>
                                                <span>Unsubscribe</span>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                
                </html>`,
        };

        return mailer.transporter.sendMail(options);
    } catch (err) {
        throw err;
    }
}

module.exports = studentRegisteredMail;