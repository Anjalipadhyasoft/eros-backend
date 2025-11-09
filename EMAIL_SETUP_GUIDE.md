# 📧 Email System Setup Guide

## Overview

When a user submits a form on your website, the system sends **TWO emails** (if SMTP is configured):

1. **Admin Notification** - To website owner(s) with full form details
2. **Thank You Email** - To the user who submitted the form

## 🔧 Quick Setup

### Step 1: Create `.env` File

In the `backend` folder, create a `.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/royella

# SMTP Configuration (Gmail)
SMTP_SERVICE=gmail
SMTP_USER=your-business-email@gmail.com
SMTP_PASS=your-16-digit-app-password

# Admin Email Recipients
ADMIN_EMAILS=admin@yourbusiness.com
```

### Step 2: Generate Gmail App Password

1. Go to: https://myaccount.google.com/
2. Click **Security** → **2-Step Verification** (enable if not already)
3. Scroll down → Click **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter name: "Royella Website"
6. Click **Generate**
7. Copy the 16-digit password (no spaces)
8. Paste it as `SMTP_PASS` in your `.env` file

### Step 3: Restart Server

```bash
npm start
```

You should see:
```
✅ SMTP transporter ready - emails will be sent
✅ Connected to MongoDB successfully!
🚀 Server running on http://localhost:5000
```

## 📨 Admin Email Details

### Who Receives Admin Emails?

Admin emails are sent to addresses specified in `ADMIN_EMAILS`:

```env
# Single recipient
ADMIN_EMAILS=admin@yourbusiness.com

# Multiple recipients (comma-separated)
ADMIN_EMAILS=admin@example.com,sales@example.com,support@example.com
```

### What Does the Admin Email Look Like?

**Subject:** `New [Form Type] Enquiry from [User Name]`
- Example: "New Support Enquiry from John Doe"
- Example: "New Product Enquiry from ABC Company"

**From:** User's email address (or `SMTP_USER` if user didn't provide email)

**Content:** HTML table with all form fields and values

**Example:**
```
New Support Enquiry Details

┌──────────────┬─────────────────────┐
│ fullName     │ John Doe            │
│ email        │ john@example.com    │
│ phoneNumber  │ 1234567890          │
│ city         │ Mumbai              │
│ state        │ Maharashtra         │
│ message      │ Need help with...   │
│ formType     │ support             │
└──────────────┴─────────────────────┘
```

### Form Types

The system handles 4 types of forms:
1. **Support** - General enquiries
2. **Product** - Product-specific enquiries
3. **Dealer** - Dealer/franchise applications
4. **Distributor** - Distributor partnership enquiries

Each form type sends a customized email subject and formatting.

## 📬 Thank You Email Details

### Who Receives Thank You Emails?

The user who submitted the form (if they provided an email address).

### What Does the Thank You Email Look Like?

**Subject:** 
- "Thank You for Contacting Padhyasoft!" (Support/Dealer/Distributor)
- "Thank You for Your Product Enquiry" (Product)

**From:** `SMTP_USER` (your business email)

**Content:**
```
Hi [User Name],

Thank you for reaching out to Padhyasoft.
We've received your enquiry and will get back to you soon.

Best regards,
Padhyasoft Team
```

## 🛠️ Configuration Options

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `SMTP_SERVICE` | No | Email provider | `gmail` (default) |
| `SMTP_USER` | Yes* | Your email address | `business@gmail.com` |
| `SMTP_PASS` | Yes* | App password | `abcd efgh ijkl mnop` |
| `ADMIN_EMAILS` | Yes* | Admin recipients | `admin@example.com` |

\* Required only if you want email functionality. Forms still work without it (data saves to DB).

### Testing Without Email

If you don't configure SMTP:
- ✅ Forms will still submit successfully
- ✅ Data will save to MongoDB
- ⚠️ No emails will be sent
- Console will show: `⚠️ Emails skipped (SMTP not configured)`

### Multiple Admin Recipients

Send notifications to multiple people:

```env
# Sales, Support, and Management
ADMIN_EMAILS=sales@company.com,support@company.com,manager@company.com
```

All listed emails will receive a copy of each form submission.

## 🧪 Testing Email System

### 1. Test with API

```bash
curl -X POST http://localhost:5000/send-enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "your-test-email@gmail.com",
    "phoneNumber": "1234567890",
    "city": "Test City",
    "state": "Test State",
    "message": "Test message",
    "formType": "support"
  }'
```

### 2. Check Server Logs

You should see:
```
✅ Enquiry saved to MongoDB: [ID]
✅ Emails sent successfully
```

### 3. Check Inboxes

- **Admin inbox**: Should have "New Support Enquiry from Test User"
- **User inbox**: Should have "Thank You for Contacting Padhyasoft!"

## 🐛 Troubleshooting

### Problem: "SMTP verification failed"

**Solution 1:** Check your Gmail App Password
```env
SMTP_PASS=abcdefghijklmnop  # No spaces, exactly 16 characters
```

**Solution 2:** Ensure 2-Factor Authentication is enabled on Gmail

**Solution 3:** Try a different email provider:
```env
SMTP_SERVICE=outlook  # For Outlook/Hotmail
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-outlook-password
```

### Problem: "Email skipped (SMTP not configured)"

This means `.env` is missing SMTP credentials. Either:
- Add `SMTP_USER` and `SMTP_PASS` to enable emails
- Or continue without emails (data still saves)

### Problem: Admin not receiving emails

**Check 1:** Verify `ADMIN_EMAILS` in `.env`
```bash
cat .env | grep ADMIN_EMAILS
```

**Check 2:** Check spam folder

**Check 3:** Check server logs for errors
```
⚠️ Email sending failed: [error message]
```

### Problem: User not receiving thank you email

**Check 1:** Ensure form includes `email` field
```json
{
  "email": "user@example.com",  // Must be present
  "formType": "support"
}
```

**Check 2:** Check spam folder

### Problem: Getting "Username and Password not accepted"

**Solution:** Use Gmail App Password, not your regular password:
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use that 16-digit code

## 📊 Email Flow Diagram

```
User Submits Form
       ↓
Backend Receives Request
       ↓
Save to MongoDB ✅
       ↓
Email Enabled? ────→ No → Skip emails (still saved)
       ↓
      Yes
       ↓
   ┌──────────────────────┐
   │  Send Admin Email    │ → admin@example.com
   │  (Form details)      │    sales@example.com
   └──────────────────────┘    manager@example.com
       ↓
   User Email Provided?
       ↓
      Yes
       ↓
   ┌──────────────────────┐
   │  Send Thank You      │ → user@example.com
   └──────────────────────┘
       ↓
Return Success Response (200)
```

## 🔒 Security Best Practices

✅ **Never commit `.env` file** - Already in `.gitignore`
✅ **Use App Passwords** - Not your main Gmail password
✅ **Rotate passwords regularly** - Generate new App Password periodically
✅ **Limit ADMIN_EMAILS** - Only add trusted recipients
✅ **Use strong SMTP passwords** - Let Gmail generate them

## 📝 Customizing Email Templates

### Change Admin Email Content

Edit `controllers/enquiryController.js`:

```javascript
// Line 66
const htmlContent = `
  <h2>New ${enquiryTypeTitle} Enquiry</h2>
  <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
  ${buildHtmlTable(formData)}
  <hr>
  <p><em>Sent from Royella Website</em></p>
`;
```

### Change Thank You Email

Edit `controllers/enquiryController.js`:

```javascript
// Line 127-137
let html = `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h3>Hi ${userName},</h3>
    <p>Thank you for contacting <strong>Padhyasoft</strong>!</p>
    <p>We've received your enquiry and our team will respond within 24 hours.</p>
    <p>Best regards,<br><strong>Padhyasoft Team</strong></p>
  </div>
`;
```

## 🚀 Production Deployment

When deploying to production:

1. **Use environment variables** (not `.env` file)
2. **Set on hosting platform:**
   - Heroku: Settings → Config Vars
   - Vercel: Project Settings → Environment Variables
   - AWS: Parameter Store or Secrets Manager
   - DigitalOcean: App Settings → Environment Variables

3. **Use professional SMTP service:**
   - SendGrid (recommended)
   - Mailgun
   - AWS SES
   - Postmark

Example with SendGrid:
```env
SMTP_SERVICE=SendGrid
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## 💡 Tips

1. **Test thoroughly** before going live
2. **Set up email forwarding** if using a custom domain
3. **Monitor email delivery** rates
4. **Keep App Passwords secure**
5. **Use different emails** for different environments (dev/staging/prod)

## Need Help?

- Check server console logs for detailed error messages
- Verify all environment variables are set correctly
- Test with `test-api.js` script
- Check MongoDB to confirm data is saving

**Email is optional** - Your forms will still work and save to database even without SMTP configured!
