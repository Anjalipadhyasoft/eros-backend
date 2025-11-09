// Utility: build an HTML table from non-empty fields
const buildHtmlTable = (dataObj = {}) => {
  let html = '<table border="1" cellpadding="5" cellspacing="0">';
  Object.entries(dataObj).forEach(([key, value]) => {
    const v = value === 0 ? 0 : value; // keep numeric 0
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      html += `<tr><td><b>${key}</b></td><td>${String(v)}</td></tr>`;
    }
  });
  html += '</table>';
  return html;
};

// Detect enquiry type from form data
const detectEnquiryType = (formData) => {
  let enquiryType = (formData.formType || '').toString().toLowerCase();
  
  if (!enquiryType) {
    if (formData.productName) {
      enquiryType = 'product';
    } else if (formData.dealerType || formData.companyName) {
      enquiryType = 'dealer';
    } else if (formData.contactPerson && formData.businessEmail) {
      enquiryType = 'distributor';
    } else {
      enquiryType = 'support';
    }
  }
  
  return enquiryType;
};

// Get enquiry type title for display
const getEnquiryTypeTitle = (enquiryType) => {
  switch (enquiryType) {
    case 'product':
      return 'Product';
    case 'dealer':
    case 'distributor':
      return 'Dealer/Distributor';
    default:
      return 'Support';
  }
};

// Resolve user identity from form data
const resolveUserIdentity = (formData) => {
  const userEmail = (formData.email || formData.businessEmail || '').toString().trim();
  const userName = (formData.fullName || formData.contactPerson || 'Website User').toString().trim();
  
  return { userEmail, userName };
};

module.exports = {
  buildHtmlTable,
  detectEnquiryType,
  getEnquiryTypeTitle,
  resolveUserIdentity,
};
