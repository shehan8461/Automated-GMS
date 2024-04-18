const nodemailer = require("nodemailer");
//
const APP_PASSWORD = process.env.APP_PASSWORD;
const EMAIL = process.env.EMAIL;
//
// Function to send email
const sendEmail = (email, subject, emailTemplate) => {
  // Create reusable transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: APP_PASSWORD,
    },
  });

  // Setup email data
  let mailOptions = {
    from: `"Selyn Cloths" <${EMAIL}>`, // Sender address
    to: email, // Recipient's email address
    subject: subject, // Email subject
    html: emailTemplate, // Email content in HTML
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(`Error sending email: ${error}`);
    }
    console.log(`Message sent to ${email}: %s`, info.messageId);
  });
};

module.exports = sendEmail;
