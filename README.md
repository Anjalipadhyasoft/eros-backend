# Royella Backend - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create Environment File
Create a `.env` file in the `backend` folder with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For local MongoDB:
MONGO_URI=mongodb://127.0.0.1:27017/royella

# For MongoDB Atlas (cloud):
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/royella?retryWrites=true&w=majority

# SMTP Email Configuration (Gmail example)
SMTP_SERVICE=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password

# Admin Email Recipients (comma-separated)
ADMIN_EMAILS=admin@example.com,sales@example.com
```

### 3. Gmail App Password Setup (if using Gmail)
1. Go to Google Account Settings: https://myaccount.google.com/
2. Enable 2-Factor Authentication
3. Go to Security > 2-Step Verification > App passwords
4. Generate a new app password for "Mail"
5. Copy the 16-digit password (no spaces) and use it as `SMTP_PASS`

### 4. Start the Server
```bash
npm start
```

The server will start on `http://localhost:5000`

## Testing the Server

### Health Check
```bash
curl http://localhost:5000/
```

Expected response:
```json
{
  "status": "Server is running",
  "database": "Connected",
  "timestamp": "2025-11-09T13:00:00.000Z"
}
```

### Test Form Submission
```bash
curl -X POST http://localhost:5000/send-enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phoneNumber": "1234567890",
    "city": "Test City",
    "state": "Test State",
    "message": "This is a test message",
    "formType": "support"
  }'
```

## Troubleshooting

### Error: "Database connection not ready"
- Check if MongoDB is running (for local) or accessible (for Atlas)
- Verify `MONGO_URI` in `.env` is correct
- Check network connection for MongoDB Atlas

### Error: "Failed to send and save enquiry"
- Check backend console logs for detailed error messages
- Common issues:
  - MongoDB connection failed
  - SMTP credentials incorrect
  - Missing required fields

### Email Not Sending
- Verify SMTP credentials are correct
- Check if Gmail allows "Less secure app access" or use App Password
- Data will still be saved to database even if email fails

### MongoDB Connection Issues

**For Local MongoDB:**
- Install MongoDB: https://www.mongodb.com/try/download/community
- Start MongoDB service
- Default connection: `mongodb://127.0.0.1:27017/royella`

**For MongoDB Atlas:**
- Create free cluster: https://www.mongodb.com/cloud/atlas/register
- Whitelist your IP address
- Get connection string from Atlas dashboard
- Replace `<username>`, `<password>`, and database name

## API Endpoints

### GET `/`
Health check endpoint
- Returns server status and database connection status

### POST `/send-enquiry`
Main endpoint for all form submissions
- Saves data to MongoDB
- Sends email to admin(s)
- Sends thank-you email to user
- Requires `formType` field: `support`, `product`, `dealer`, or `distributor`

### POST `/save-enquiry`
Alternative endpoint that only saves to database (no emails)
- Useful for testing database connection

## Form Types

1. **Support** (`formType: 'support'`)
   - Fields: fullName, email, phoneNumber, city, state, message

2. **Product** (`formType: 'product'`)
   - Fields: fullName, email, phoneNumber, companyName, productName, quantity, additionalInfo

3. **Dealer** (`formType: 'dealer'`)
   - Fields: dealerType, businessName, businessAddress, city, state, pincode, gstNumber, annualTurnover, experience, existingBrands, investmentCapacity

4. **Distributor** (`formType: 'distributor'`)
   - Fields: companyName, contactPerson, businessEmail, mobileNumber, city, country, website, and many more (see schema)

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| PORT | No | Server port | 5000 |
| NODE_ENV | No | Environment mode | development |
| MONGO_URI | Yes | MongoDB connection string | mongodb://127.0.0.1:27017/royella |
| SMTP_SERVICE | No | Email service provider | gmail |
| SMTP_USER | Yes | SMTP email address | your@gmail.com |
| SMTP_PASS | Yes | SMTP password/app password | xxxx xxxx xxxx xxxx |
| ADMIN_EMAILS | Yes | Recipient email(s) | admin@example.com |

## Common Issues

### "Cannot use import statement outside a module"
✅ **FIXED**: Backend now uses CommonJS (`require`) syntax

### JSON Parse Error in package.json
✅ **FIXED**: Removed comment from package.json

### SMTP Authentication Error
- Use Gmail App Password (16 digits, no spaces)
- Don't use regular Gmail password
- Enable 2-Factor Authentication first

## Database Schema

All enquiries are stored with:
- All form fields
- `formType` (support/product/dealer/distributor)
- `createdAt` timestamp
- `updatedAt` timestamp

## Need Help?

Check the console output when starting the server:
- ✅ = Success
- ❌ = Error
- ⚠️ = Warning

The server logs will tell you exactly what's wrong!
