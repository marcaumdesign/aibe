import nodemailer from 'nodemailer';

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing ${key} in environment`);
  }
}

const toAddress = process.argv[2] || process.env.SMTP_USER;
const fromAddress = process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER;
const fromName = process.env.EMAIL_FROM_NAME || 'AIBE';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const result = await transporter.sendMail({
  from: `"${fromName}" <${fromAddress}>`,
  to: toAddress,
  subject: 'SMTP test from AIBE project',
  text: `This is an automated SMTP connectivity test sent at ${new Date().toISOString()}`,
});

console.log('Message sent, provider response:');
console.log(result);
