const welcomeEmailTemplate = (userName, email, password) => `
<!DOCTYPE html>
<html>
<head>
    <title>Welcome!</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .welcome { color: #333366; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="welcome">Welcome to Selyn Clothes, ${userName}!</h1>
        <p>Hi ${userName},</p>
        <p>We're excited to have you on board.</p>
        <p>Here are your login credentials:</p>
        <p>Email: ${email}</p>
        <p
            >Password: ${password}</p
        >
        <p>Please keep these credentials safe and do not share them with anyone.</p>
        <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
        <br />
        <p>Thank you,</p>
        <p>The Selyn Clothes Team</p>
    </div>
</body>
</html>
`;

module.exports = welcomeEmailTemplate;
