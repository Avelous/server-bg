import nodemailer from "nodemailer";
import SibApiV3Sdk from "sib-api-v3-sdk";

const myMail = "invest@primepilot.com";

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// let transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   secure: true,
//   port: 465,
//   auth: {
//     user: myMail,
//     pass: "Disney303@",
//   },
//   connectionTimeout: 10000,
// });
// oawsxxsortuzyvfh

// export const sendEmail = (subject, text, recipient) => {
//   let mailOptions = {
//     from: myMail,
//     to: recipient,
//     subject: subject,
//     html: text,
//   };
//   console.log("Sending mail");
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

export const sendLoggedin = (subject, date, recipient) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>PrimePilot</title>
    <style>
      body {
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      
      .header {
        background-color: #CCCC00;
        color: #fff;
        padding: 20px;
      }
      
      .header h1 {
        margin: 0;
      }
      
      .content {
        padding: 20px;
      }
      
      .cta-button {
        display: inline-block;
        background-color: #CCCC00;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
      }
      
      .cta-button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>PrimePilot!</h1>
    </div>
    <div class="content">
      <strong>PrimePilot Login</strong>
      <p>Dear valued customer</p>
      <small>Please be informed that your PrimePilot profile was accessed on <strong>${date}</strong></small>
    <br/>
      <small>If you did not log on to your profile, please contact us immediately at <strong>support@primepilot.com</strong> and log on to your account to change your password.</small>
      <p><small>Best regards,</small></p>
      <p>PrimePilot Team</p>
    </div>
  </body>
  </html>
  `;
  sendSmtpEmail.sender = {
    name: "Prime Pilot",
    email: "invest@primepilot.com",
  };
  sendSmtpEmail.to = [
    {
      email: recipient,
    },
  ];

  // Send the email
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API call successful. Response body:", data);
    },
    function (error) {
      console.error(error);
    }
  );
};

export const sendVerifySuccess = (subject, firstName, recipient) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>PrimePilot!</title>
    <style>
      body {
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      
      .header {
        background-color: #CCCC00;
        color: #fff;
        padding: 20px;
      }
      
      .header h1 {
        margin: 0;
      }
      
      .content {
        padding: 20px;
      }
      
      .cta-button {
        display: inline-block;
        background-color: #CCCC00;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
      }
      
      .cta-button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>PrimePilot!</h1>
    </div>
    <div class="content">
      <p>Dear <strong>${firstName},</strong></p>
      <p>Your account verification is successful! Thank you for joining us!!</p>
      <p>Please proceed to access all the features of our platform and start exploring.</p>
      <p>If you have any questions or need any assistance, please don't hesitate to contact us at <strong>support@primepilot.com</strong>.</p>
      <p>Best regards,</p>
      <p>PrimePilot Team</p>
      <a href="" class="cta-button">Login</a>
    </div>
  </body>
  </html>
  
`;
  sendSmtpEmail.sender = {
    name: "Prime Pilot",
    email: "invest@primepilot.com",
  };
  sendSmtpEmail.to = [
    {
      email: recipient,
    },
  ];

  // Send the email
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API call successful. Response body:", data);
    },
    function (error) {
      console.error(error);
    }
  );
};

