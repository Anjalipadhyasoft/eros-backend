//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const enquirySchema = new mongoose.Schema(
  {
    // Common fields
    fullName: String,
    email: String,
    phoneNumber: String,
    message: String,

    // Identify which form was submitted
    formType: {
      type: String,
      enum: ['support', 'product', 'dealer', 'distributor'],
      required: true,
    },

    // Distributor fields
    companyName: String,
    contactPerson: String,
    businessEmail: String,
    mobileNumber: String,
    city: String,
    country: String,
    website: String,
    yearsInBusiness: String,
    currentBrands: String,
    monthlyTurnover: String,
    workingCapital: String,
    warehouseSize: String,
    facilityOwnership: String,
    commercialVehicles: String,
    retailerAccounts: String,
    hasShowroom: String,
    hasCompetingBrand: String,
    competingBrandDetails: String,
    willStockProducts: String,
    willPromoteFullRange: String,
    agreeGuidelines: String,
    expectedGrowth: String,
    willParticipateMarketing: String,
    whyAssociate: String,
    additionalComments: String,
    confirmInfo: Boolean,

    // Product fields
    productName: String,
    quantity: String,
    additionalInfo: String,

    // Dealer fields
    dealerType: String,
    businessName: String,
    businessAddress: String,
    state: String,
    pincode: String,
    gstNumber: String,
    annualTurnover: String,
    experience: String,
    existingBrands: String,
    investmentCapacity: String,
  },
  { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;
