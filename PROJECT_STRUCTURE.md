# Backend Project Structure

## 📁 Directory Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection configuration
├── controllers/
│   └── enquiryController.js     # Business logic for enquiries
├── middleware/
│   └── dbCheck.js               # Database connection check middleware
├── models/
│   └── enquiryModel.js          # Mongoose schema for enquiries
├── routes/
│   └── enquiryRoutes.js         # Express routes for enquiry endpoints
├── utils/
│   ├── emailService.js          # Email sending functionality
│   └── helpers.js               # Utility functions
├── .env                         # Environment variables (create this)
├── .env.example                 # Example environment variables
├── package.json                 # Dependencies
├── server.js                    # Main entry point
└── README.md                    # Setup guide
```

## 📝 File Descriptions

### **server.js**
- Main entry point of the application
- Initializes Express app
- Connects to database
- Initializes email service
- Sets up routes
- Starts server

### **config/database.js**
- Handles MongoDB connection
- Validates MONGO_URI from environment
- Provides connection error handling

### **controllers/enquiryController.js**
- **saveEnquiry**: Saves form data to database only (no emails)
- **submitEnquiry**: Saves form data AND sends emails
- Contains business logic for enquiry processing
- Handles email generation and sending

### **routes/enquiryRoutes.js**
- Defines API endpoints:
  - `POST /save-enquiry` - Save without email
  - `POST /send-enquiry` - Save with email notifications
- Applies middleware (DB connection check)
- Maps routes to controller functions

### **models/enquiryModel.js**
- Mongoose schema definition
- Defines all form fields
- Includes timestamps (createdAt, updatedAt)
- Supports all 4 form types: support, product, dealer, distributor

### **middleware/dbCheck.js**
- Checks if MongoDB is connected before processing requests
- Returns 503 error if database not ready
- Applied to all form submission routes

### **utils/emailService.js**
- **initializeEmailService()**: Sets up nodemailer transporter
- **sendEmail()**: Sends individual emails
- **isEmailEnabled()**: Checks if SMTP is configured
- **getAdminRecipients()**: Returns admin email addresses
- Handles SMTP configuration and verification

### **utils/helpers.js**
- **buildHtmlTable()**: Converts form data to HTML table
- **detectEnquiryType()**: Determines form type from data
- **getEnquiryTypeTitle()**: Returns display title for form type
- **resolveUserIdentity()**: Extracts user email and name

## 🔄 Request Flow

### 1. Form Submission Request
```
Frontend → POST /send-enquiry → server.js
```

### 2. Routing
```
server.js → enquiryRoutes.js → checkDbConnection middleware
```

### 3. Controller Processing
```
enquiryRoutes.js → enquiryController.submitEnquiry()
```

### 4. Business Logic
```
1. Extract and validate form data
2. Detect enquiry type
3. Save to MongoDB (models/enquiryModel.js)
4. Build email content (utils/helpers.js)
5. Send emails if SMTP configured (utils/emailService.js)
6. Return success response
```

## 🎯 Key Features

### ✅ Modular Architecture
- Separation of concerns (MVC pattern)
- Easy to maintain and test
- Scalable structure

### ✅ Express Router
- Clean route definitions
- Middleware support
- RESTful API design

### ✅ Database Integration
- MongoDB with Mongoose
- Automatic timestamps
- Connection validation

### ✅ Email Service
- Optional SMTP configuration
- Fails gracefully if not configured
- Sends admin and user thank-you emails

### ✅ Error Handling
- Detailed error logging
- Non-blocking email failures
- Development/production error modes

## 🚀 Usage Examples

### Start Server
```bash
cd backend
npm start
```

### Test Health Check
```bash
curl http://localhost:5000/
```

### Submit Form (Support)
```bash
curl -X POST http://localhost:5000/send-enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "city": "Mumbai",
    "state": "Maharashtra",
    "message": "I need support",
    "formType": "support"
  }'
```

### Save Without Email
```bash
curl -X POST http://localhost:5000/save-enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "formType": "support",
    ...
  }'
```

## 🔧 Adding New Features

### Add New Route
1. Create controller function in `controllers/enquiryController.js`
2. Add route in `routes/enquiryRoutes.js`
3. Apply middleware if needed

### Add New Utility
1. Create function in `utils/helpers.js`
2. Export and import where needed

### Modify Email Template
1. Edit `generateThankYouEmail()` in `controllers/enquiryController.js`
2. Or modify `buildHtmlTable()` in `utils/helpers.js`

## 📊 Environment Variables

See `.env.example` for all available variables:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode
- `MONGO_URI` - MongoDB connection string
- `SMTP_USER` - Email sender address
- `SMTP_PASS` - Email password/app password
- `SMTP_SERVICE` - Email service (default: gmail)
- `ADMIN_EMAILS` - Comma-separated admin emails

## 🛡️ Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ CORS enabled
- ✅ Input validation via Mongoose schema
- ✅ Error messages sanitized in production
- ✅ Database connection checks

## 📈 Future Enhancements

Potential improvements:
- Add input validation middleware (e.g., express-validator)
- Implement rate limiting
- Add API authentication (JWT)
- Create admin panel routes
- Add file upload support
- Implement logging service (Winston/Morgan)
- Add unit tests (Jest/Mocha)
- Add API documentation (Swagger)

## 🐛 Troubleshooting

### Routes not working
- Check if routes are properly imported in `server.js`
- Verify middleware order
- Check console for error logs

### Database not saving
- Verify MongoDB connection in logs
- Check MONGO_URI in `.env`
- Ensure Mongoose schema matches data

### Emails not sending
- Check SMTP credentials
- Verify `emailService.js` initialization logs
- Emails are optional - data still saves

## 📚 Code Quality

- ✅ CommonJS modules (require/module.exports)
- ✅ Consistent error handling
- ✅ Clear function names
- ✅ Commented code sections
- ✅ DRY principle followed
- ✅ Single responsibility per file
