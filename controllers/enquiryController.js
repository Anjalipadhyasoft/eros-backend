const Enquiry = require('../models/enquiryModel');
const { sendEmail, isEmailEnabled, getAdminRecipients } = require('../utils/emailService');
const {
  buildHtmlTable,
  detectEnquiryType,
  getEnquiryTypeTitle,
  resolveUserIdentity,
} = require('../utils/helpers');

// Save enquiry to database only (no emails)
const saveEnquiry = async (req, res) => {
  try {
    console.log('Incoming /save-enquiry payload:', req.body);
    const formData = { ...req.body };

    // If formType missing, try to infer
    if (!formData.formType) {
      formData.formType = detectEnquiryType(formData);
    }

    const newEnquiry = new Enquiry(formData);
    await newEnquiry.save();

    console.log('✅ Enquiry saved to MongoDB:', newEnquiry._id);

    res.status(200).json({
      success: true,
      message: 'Enquiry saved successfully! saveEnquiry',
    });
  } catch (error) {
    console.error('❌ Error saving enquiry:', error);
    console.error('Error details:', error.message);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
    }
    res.status(500).json({
      success: false,
      message: 'Error saving data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Handle enquiry submission with database save and email notifications
const submitEnquiry = async (req, res) => {
  try {
    const formData = req.body;

    // Detect enquiry type
    const formType = detectEnquiryType(formData);
    const enquiryTypeTitle = getEnquiryTypeTitle(formType);

    // Resolve user identity for emails
    const { userEmail, userName } = resolveUserIdentity(formData);

    // ====== SAVE DATA TO DATABASE ======
    const newEnquiry = new Enquiry({
      ...formData,
      formType,
    });
    await newEnquiry.save();

    console.log('✅ Enquiry saved to MongoDB:', newEnquiry._id);

    // ====== BUILD EMAIL CONTENT ======
    const htmlContent = `<h2>New ${enquiryTypeTitle} Enquiry Details</h2>` + buildHtmlTable(formData);

    // ====== SEND EMAILS (if enabled) ======
    if (isEmailEnabled()) {
      try {
        const adminRecipients = getAdminRecipients();
        const emailsToSend = [];

        // Admin email
        emailsToSend.push(
          sendEmail({
            from: `"${enquiryTypeTitle} Enquiry" <${
              userEmail || process.env.SMTP_USER || 'no-reply@padhyasoft.com'
            }>`,
            to: adminRecipients,
            subject: `New ${enquiryTypeTitle} Enquiry from ${userName}`,
            html: htmlContent,
          })
        );

        // Thank-you email to user (if email provided)
        if (userEmail) {
          const { subject: userSubject, html: userHtml } = generateThankYouEmail(
            userName,
            formType,
            formData.productName
          );

          emailsToSend.push(
            sendEmail({
              from: `"Padhyasoft Team" <${process.env.SMTP_USER || 'no-reply@padhyasoft.com'}>`,
              to: userEmail,
              subject: userSubject,
              html: userHtml,
            })
          );
        }

        await Promise.all(emailsToSend);
        console.log('✅ Emails sent successfully submitEnquiry');
      } catch (emailError) {
        console.error('⚠️ Email sending failed (but data saved):', emailError.message);
      }
    } else {
      console.log('⚠️  Emails skipped (SMTP not configured) - Data saved to database');
    }

    res.status(200).json({
      success: true,
      message: '✅ Enquiry sent & saved successfully!',
    });
  } catch (error) {
    console.error('❌ Error sending enquiry:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to send and save enquiry',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Generate thank you email content
const generateThankYouEmail = (userName, formType, productName) => {
  let subject = 'Thank You for Contacting Padhyasoft!';
  let html = `<h3>Hi ${userName || ''},</h3>
    <p>Thank you for reaching out to <b>Padhyasoft</b>.</p>
    <p>We've received your enquiry and will get back to you soon.</p>
    <br/><p>Best regards,<br><b>Padhyasoft Team</b></p>`;

  if (formType === 'product' || productName) {
    subject = 'Thank You for Your Product Enquiry';
    html = `<h3>Hi ${userName || ''},</h3>
      <p>Thank you for your product enquiry.</p>
      <p>We will get back to you shortly.</p>
      <br/><p>Best regards,<br><b>Padhyasoft Team</b></p>`;
  }

  return { subject, html };
};

module.exports = {
  saveEnquiry,
  submitEnquiry,
};
