const nodemailer = require('nodemailer');

let transporter = null;
let emailEnabled = false;

// Initialize email transporter
const initializeEmailService = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter
    transporter.verify((err) => {
      if (err) {
        console.error('❌ SMTP verification failed:', err.message);
        console.log('⚠️  Emails will NOT be sent. Forms will still be saved to database.');
        emailEnabled = false;
      } else {
        console.log('✅ SMTP transporter ready - emails will be sent');
        emailEnabled = true;
      }
    });
  } else {
    console.log('⚠️  SMTP credentials not configured in .env');
    console.log('⚠️  Emails will NOT be sent. Forms will still be saved to database.');
    console.log('💡 To enable emails, add SMTP_USER and SMTP_PASS to your .env file');
  }
};

// Send email function
const sendEmail = async ({ from, to, subject, html }) => {
  if (!transporter || !emailEnabled) {
    console.log('⚠️  Email skipped (SMTP not configured)');
    return Promise.resolve({ skipped: true });
  }

  const recipients = Array.isArray(to)
    ? to
    : typeof to === 'string'
    ? to.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return transporter.sendMail({
    from,
    to: recipients,
    subject,
    html,
    replyTo: from,
  });
};

// Check if email is enabled
const isEmailEnabled = () => emailEnabled;

// Get admin recipients from env
const getAdminRecipients = () => {
  return (process.env.ADMIN_EMAILS || 'padhyasoftseo@gmail.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

module.exports = {
  initializeEmailService,
  sendEmail,
  isEmailEnabled,
  getAdminRecipients,
};
