import SibApiV3Sdk from "sib-api-v3-sdk";

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

// Create an instance of the API class
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendBlueEmail = (subject, body, recipient) => {
  // Create a SendSmtpEmail object
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `<html><body><p>${body}</p></body></html>`;
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

export const sendRegistered = (subject, firstname, code, recipient) => {
  // Create a SendSmtpEmail object
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Welcome to PrimePilot!</title>
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
      <h1>Welcome to PrimePilot!</h1>
    </div>
    <div class="content">
      <p>Dear <strong>${firstname},</strong></p>
      <p>Thank you for joining our community! We're excited to have you on board.</p>
      <P>Your verification code is <strong>${code}</strong></P>
      <p>Verify you account to access all the features of our platform and start exploring.</p>
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
