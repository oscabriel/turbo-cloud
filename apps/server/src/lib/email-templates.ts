export const verificationCodeEmail = (otp: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Code</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 4px;
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 6px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hi!</h2>
        <p>Please use the following code to verify your account:</p>
        <div class="code">${otp}</div>
        <p>This code will expire in 10 minutes. If you didn't request this code, you can safely ignore this email.</p>
        <div class="footer">
            <p>Best regards,<br>Better ☁️</p>
        </div>
    </div>
</body>
</html>
`;
