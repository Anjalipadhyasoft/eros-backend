// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/send-email", async (req, res) => {
//   const { fullName, email, phoneNumber, message } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.SENDER_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: process.env.RECEIVER_EMAIL,
//       subject: "New Enquiry from Website",
//       html: `
//         <h3>New Enquiry Details</h3>
//         <p><b>Name:</b> ${fullName}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phoneNumber}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, message: "Failed to send email." });
//   }
// });

// app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





// import express from "express";
// import cors from "cors";
// import nodemailer from "nodemailer";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Replace with your email credentials
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "yourgmail@gmail.com", // your Gmail ID
//     pass: "your-app-password" // your Gmail App Password
//   }
// });

// app.post("/send-email", async (req, res) => {
//   const { fullName, email, phoneNumber, message } = req.body;

//   const mailOptions = {
//     from: email,
//     to: "yourgmail@gmail.com", // Receiver email (yours)
//     subject: `New Enquiry from ${fullName}`,
//     text: `
// Name: ${fullName}
// Email: ${email}
// Phone: ${phoneNumber}
// Message: ${message}
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ success: false, message: "Email failed to send." });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));




// 


// =======================================



// server.js - ES Module version of your multi-form email backend

// import express from 'express';
// import nodemailer from 'nodemailer';
// import cors from 'cors';

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Configure your email transporter (Gmail example)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',       // Replace with your email
//     pass: 'your-email-app-password'     // Use App Password if 2FA is ON
//   }
// });

// // POST route to handle form submission
// app.post('/send-email', async (req, res) => {
//   try {
//     const { formType, formData } = req.body;

//     if (!formType || !formData) {
//       return res.status(400).json({ success: false, message: 'Form data missing' });
//     }

//     // Function to generate email content for each form type
//     const generateEmailContent = (type, data) => {
//       switch (type) {
//         case 'support':
//           return `
// **Support Enquiry**

// Name: ${data.fullName}
// Email: ${data.email}
// Phone: ${data.phoneNumber}
// City: ${data.city}
// State: ${data.state}

// Message:
// ${data.message}
//           `;
//         case 'product':
//           return `
// **Product Enquiry**

// Name: ${data.fullName}
// Email: ${data.email}
// Phone: ${data.phoneNumber}
// Company: ${data.companyName}

// Product Name: ${data.productName}
// Quantity: ${data.quantity}

// Additional Info:
// ${data.additionalInfo || 'N/A'}
//           `;
//         case 'dealer':
//           return `
// **Dealer Application**

// Dealer Type: ${data.dealerType}
// Business Name: ${data.businessName}
// Business Address: ${data.businessAddress}
// City: ${data.city}
// State: ${data.state}
// Pincode: ${data.pincode}
// GST Number: ${data.gstNumber}
// Annual Turnover: ${data.annualTurnover || 'N/A'}
// Experience: ${data.experience} years
// Existing Brands: ${data.existingBrands || 'N/A'}
// Investment Capacity: ${data.investmentCapacity || 'N/A'}
//           `;
//         case 'distributor':
//           return `
// **Distributor Application**

// Company Name: ${data.companyName}
// Contact Person: ${data.contactPerson}
// Business Email: ${data.businessEmail}
// Mobile/WhatsApp: ${data.mobileNumber}
// City/Region: ${data.city}
// Country: ${data.country}
// Website/Social Media: ${data.website || 'N/A'}

// Years in Business: ${data.yearsInBusiness}
// Current Brands: ${data.currentBrands || 'N/A'}
// Monthly Turnover: ${data.monthlyTurnover || 'N/A'}
// Working Capital: ${data.workingCapital}
// Warehouse Size: ${data.warehouseSize}
// Facility Ownership: ${data.facilityOwnership}
// Commercial Vehicles: ${data.commercialVehicles}
// Retailer Accounts: ${data.retailerAccounts}
// Has Showroom: ${data.hasShowroom}
// Has Competing Brand: ${data.hasCompetingBrand}
// Competing Brand Details: ${data.competingBrandDetails || 'N/A'}
// Will Stock Products: ${data.willStockProducts}
// Will Promote Full Range: ${data.willPromoteFullRange}
// Agree Guidelines: ${data.agreeGuidelines}
// Expected Growth: ${data.expectedGrowth}
// Will Participate in Marketing: ${data.willParticipateMarketing}
// Why Associate: ${data.whyAssociate || 'N/A'}
// Additional Comments: ${data.additionalComments || 'N/A'}
// Info Confirmed: ${data.confirmInfo ? 'Yes' : 'No'}
//           `;
//         default:
//           return 'Form data received.';
//       }
//     };

//     const emailContent = generateEmailContent(formType, formData);

//     const mailOptions = {
//       from: `"${formData.fullName || 'Enquiry'}" <${formData.email || 'no-reply@example.com'}>`,
//       to: [
//         'first-recipient@gmail.com',      // First recipient email
//         'second-recipient@gmail.com'      // Second recipient email
//       ],
//       subject: `New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Form Submission`,
//       text: emailContent
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({ success: true, message: 'Email sent successfully to both recipients' });
//   } catch (error) {
//     console.error('Email sending error:', error);
//     return res.status(500).json({ success: false, message: 'Server Error' });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });






// // server.js
// import express from 'express';
// import nodemailer from 'nodemailer';
// import cors from 'cors';

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // POST route to handle enquiry form
// app.post('/send-enquiry', async (req, res) => {
//   const { fullName, email, phoneNumber, city, state, message } = req.body;

//   // Create transporter (Gmail)
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'padhyasoftseo@gmail.com', // your email
//       pass: 'dqjclacxnzuvgeng',  // <--- replace with your app password
//     },
//   });

//   try {
//     // 1️⃣ Send mail to admin
//     await transporter.sendMail({
//       from: `"Website Enquiry" <${email}>`,
//       to: 'padhyasoftseo@gmail.com',
//       subject: `New Support Enquiry from ${fullName}`,
//       html: `
//         <h2>New Enquiry Details</h2>
//         <p><b>Full Name:</b> ${fullName}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phoneNumber}</p>
//         <p><b>City:</b> ${city}</p>
//         <p><b>State:</b> ${state}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//     });

//     // 2️⃣ Send thank-you email to user
//     await transporter.sendMail({
//       from: '"Padhyasoft Team" <padhyasoftseo@gmail.com>',
//       to: email,
//       subject: 'Thank You for Contacting Padhyasoft!',
//       html: `
//         <h3>Hi ${fullName},</h3>
//         <p>Thank you for reaching out to <b>Padhyasoft</b>.</p>
//         <p>We’ve received your enquiry and will get back to you soon.</p>
//         <br/>
//         <p>Best regards,<br><b>Padhyasoft Team</b></p>
//       `,
//     });

//     res.status(200).json({ success: true, message: 'Emails sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ success: false, message: 'Failed to send email' });
//   }
  
// });

// // POST route to handle product enquiry
// app.post('/send-product-enquiry', async (req, res) => {
//   const { fullName, email, phoneNumber, companyName, productName, quantity, additionalInfo } = req.body;

//   // Create HTML email content
//   const htmlContent = `
//     <h2>New Product Enquiry</h2>
//     <p><strong>Full Name:</strong> ${fullName}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Phone Number:</strong> ${phoneNumber}</p>
//     <p><strong>Company Name:</strong> ${companyName}</p>
//     <p><strong>Product Name:</strong> ${productName}</p>
//     <p><strong>Quantity:</strong> ${quantity}</p>
//     <p><strong>Additional Info:</strong> ${additionalInfo}</p>
//   `;

//   try {
//     // Configure Nodemailer
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'YOUR_GMAIL@gmail.com', // your Gmail
//         pass: 'dqjclacxnzuvgeng', // App Password (not your normal password)
//       },
//     });

//     await transporter.sendMail({
//       from: email,
//       to: 'padhyasoftseo@gmail.com',
//       subject: 'New Product Enquiry',
//       html: htmlContent,
//     });

//     res.status(200).json({ message: 'Enquiry sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error sending enquiry' });
//   }
// });



// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


// ==========================================================================================

// // server.js
// import express from 'express';
// import nodemailer from 'nodemailer';
// import cors from 'cors';

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Create a single reusable transporter for Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'padhyasoftseo@gmail.com', // Your Gmail
//     pass: 'dqjclacxnzuvgeng',      // <-- Replace with Gmail App Password
//   },
// });

// // Helper function to send email
// const sendEmail = async ({ from, to, subject, html }) => {
//   return transporter.sendMail({ from, to, subject, html });
// };

// // Route: Support 
// app.post('/send-enquiry', async (req, res) => {
//   try {
//     const { fullName, email, phoneNumber, city, state, message } = req.body;

//     // Build HTML dynamically for all forms
//     let htmlContent = '<h2>New Enquiry Details</h2><table border="1" cellpadding="5" cellspacing="0">';
//     Object.entries(req.body).forEach(([key, value]) => {
//       htmlContent += `<tr><td><b>${key}:</b></td><td>${value}</td></tr>`;
//     });
//     htmlContent += '</table>';

//     // Send email to admin
//     await sendEmail({
//       from: `"Website Enquiry" <${email || 'no-reply@padhyasoft.com'}>`,
//       to: 'padhyasoftseo@gmail.com',
//       subject: `New Enquiry from ${fullName || 'Website User'}`,
//       html: htmlContent,
//     });

//     // Thank-you email to user (if email provided)
//     if (email) {
//       await sendEmail({
//         from: '"Padhyasoft Team" <padhyasoftseo@gmail.com>',
//         to: email,
//         subject: 'Thank You for Contacting Padhyasoft!',
//         html: `<h3>Hi ${fullName || ''},</h3>
//                <p>Thank you for reaching out to <b>Padhyasoft</b>.</p>
//                <p>We’ve received your enquiry and will get back to you soon.</p>
//                <br/>
//                <p>Best regards,<br><b>Padhyasoft Team</b></p>`,
//       });
//     }

//     res.status(200).json({ success: true, message: 'Emails sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ success: false, message: 'Failed to send email' });
//   }
// });

// // Route: Product dealer Enquiry
// app.post('/send-product-enquiry', async (req, res) => {
//   try {
//     const { fullName, email } = req.body;

//     let htmlContent = '<h2>New Product Enquiry</h2><table border="1" cellpadding="5" cellspacing="0">';
//     Object.entries(req.body).forEach(([key, value]) => {
//       htmlContent += `<tr><td><b>${key}:</b></td><td>${value}</td></tr>`;
//     });
//     htmlContent += '</table>';

//     await sendEmail({
//       from: `"Product Enquiry" <${email || 'no-reply@padhyasoft.com'}>`,
//       to: 'padhyasoftseo@gmail.com',
//       subject: 'New Product Enquiry',
//       html: htmlContent,
//     });

//     // Thank-you email to user
//     if (email) {
//       await sendEmail({
//         from: '"Padhyasoft Team" <padhyasoftseo@gmail.com>',
//         to: email,
//         subject: 'Thank You for Your Product Enquiry',
//         html: `<h3>Hi ${fullName || ''},</h3>
//                <p>Thank you for your product enquiry.</p>
//                <p>We will get back to you shortly.</p>
//                <br/>
//                <p>Best regards,<br><b>Padhyasoft Team</b></p>`,
//       });
//     }

//     res.status(200).json({ success: true, message: 'Product enquiry sent successfully!' });
//   } catch (error) {
//     console.error('Error sending product enquiry:', error);
//     res.status(500).json({ success: false, message: 'Failed to send product enquiry' });
//   }
// });

// // dealer

// // Route: Dealer Enquiry
// app.post('/send-enquiry', async (req, res) => {
//   try {


//     let htmlContent = '<h2>New Dealer Enquiry</h2><table border="1" cellpadding="5" cellspacing="0">';
//     Object.entries(req.body).forEach(([key, value]) => {
//       htmlContent += `<tr><td><b>${key}:</b></td><td>${value}</td></tr>`;
//     });
//     htmlContent += '</table>';

//     // Send email to admin
//     await sendEmail({
//       from: `"Dealer Enquiry" <no-reply@padhyasoft.com>`,
//       to: 'padhyasoftseo@gmail.com',
//       subject: 'New Dealer Enquiry',
//       html: htmlContent,
//     });

//     res.status(200).json({ success: true, message: 'Dealer enquiry sent successfully!' });
//   } catch (error) {
//     console.error('Error sending dealer enquiry:', error);
//     res.status(500).json({ success: false, message: 'Failed to send dealer enquiry' });
//   }
// });


// // Start server
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));


// ==================================================================================================



// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a single reusable transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'padhyasoftseo@gmail.com', // Your Gmail
    pass: 'dqjclacxnzuvgeng',      // <-- Replace with Gmail App Password
  },
});

// Helper function to send email
const sendEmail = async ({ from, to, subject, html }) => {
  return transporter.sendMail({ from, to, subject, html });
};

// Unified route to handle all enquiries
app.post('/send-enquiry', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, city, state, message, dealerType, companyName, contactPerson, businessEmail, mobileNumber, productName, quantity, additionalInfo } = req.body;

    // Determine type of enquiry
    let enquiryType = 'Support';
    if (productName) enquiryType = 'Product';
    else if (dealerType || companyName) enquiryType = 'Dealer/Distributor';

    // Build HTML dynamically for admin
    let htmlContent = `<h2>New ${enquiryType} Enquiry Details</h2><table border="1" cellpadding="5" cellspacing="0">`;
    Object.entries(req.body).forEach(([key, value]) => {
      htmlContent += `<tr><td><b>${key}:</b></td><td>${value}</td></tr>`;
    });
    htmlContent += '</table>';

    // Prepare emails
    const emailsToSend = [
      // Admin email
      sendEmail({
        from: `"${enquiryType} Enquiry" <${email || 'no-reply@padhyasoft.com'}>`,
        to: 'padhyasoftseo@gmail.com',
        subject: `New ${enquiryType} Enquiry from ${fullName || 'Website User'}`,
        html: htmlContent,
      }),
    ];

    // Thank-you email to user
    if (email) {
      let userSubject = 'Thank You for Contacting Padhyasoft!';
      let userHtml = `<h3>Hi ${fullName || ''},</h3><p>Thank you for reaching out to <b>Padhyasoft</b>.</p><p>We’ve received your enquiry and will get back to you soon.</p><br/><p>Best regards,<br><b>Padhyasoft Team</b></p>`;

      if (productName) {
        userSubject = 'Thank You for Your Product Enquiry';
        userHtml = `<h3>Hi ${fullName || ''},</h3><p>Thank you for your product enquiry.</p><p>We will get back to you shortly.</p><br/><p>Best regards,<br><b>Padhyasoft Team</b></p>`;
      }

      emailsToSend.push(
        sendEmail({
          from: '"Padhyasoft Team" <padhyasoftseo@gmail.com>',
          to: email,
          subject: userSubject,
          html: userHtml,
        })
      );
    }

    // Send all emails in parallel
    await Promise.all(emailsToSend);

    res.status(200).json({ success: true, message: 'Enquiry sent successfully!' });
  } catch (error) {
    console.error('Error sending enquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to send enquiry' });
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
