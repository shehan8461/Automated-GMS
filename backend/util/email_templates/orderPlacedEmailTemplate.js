const orderPlacedEmailTemplate = (userName, orderNumber, orderDate) => `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Order Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .confirmation { color: #008000; } /* Using a green color to indicate success */
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="confirmation">Order Placed Successfully</h1>
        <p>Hello ${userName},</p>
        <p>Thank you for your purchase. We are pleased to confirm your order.</p>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Order Date:</strong> ${orderDate}</p>
        <p>Your order will be processed as soon as possible. We will send you another email once your items are on their way.</p>
        <br />
        <p>If you have any questions or need to make any changes to your order, please contact us immediately.</p>
        <br />
        <p>Thank you for choosing us,</p>
        <p>Team Sales and Distribution</p>
      </div>
    </body>
    </html>
    `;

module.exports = orderPlacedEmailTemplate;
