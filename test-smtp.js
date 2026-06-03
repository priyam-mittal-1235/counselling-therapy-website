const nodemailer = require('./node_modules/nodemailer');
require('dotenv').config({ path: '.env.local' });

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailTo = process.env.EMAIL_TO;

console.log('[TEST] EMAIL_USER:', emailUser);
console.log('[TEST] EMAIL_PASS set:', emailPass ? 'YES (' + emailPass.length + ' chars)' : 'NOT SET');
console.log('[TEST] EMAIL_TO:', emailTo);
console.log('[TEST] Verifying SMTP connection...');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: emailUser, pass: emailPass }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('[SMTP ERROR] Authentication failed:', error.message);
    console.error('[ERROR CODE]', error.code);
  } else {
    console.log('[SMTP OK] Authentication successful! Gmail is ready to send emails.');
    console.log('[TEST] Sending a test email to', emailTo, '...');
    transporter.sendMail({
      from: '"Mindful Living Website" <' + emailUser + '>',
      to: emailTo,
      subject: 'SMTP Test - Mindful Living Website',
      html: '<p>This is a test email confirming that the contact form email notifications are working correctly.</p>'
    }, function(err, info) {
      if (err) {
        console.error('[SEND ERROR]', err.message);
      } else {
        console.log('[EMAIL SENT] Message ID:', info.messageId);
        console.log('[EMAIL SENT] Response:', info.response);
      }
    });
  }
});
