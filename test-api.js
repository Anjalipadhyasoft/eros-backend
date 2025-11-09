// Simple test script to verify API is working and saving to database
const axios = require('axios');

const API_BASE = 'http://localhost:5000';

// Test data for support form
const testData = {
  fullName: 'Test User',
  email: 'test@example.com',
  phoneNumber: '1234567890',
  city: 'Mumbai',
  state: 'Maharashtra',
  message: 'This is a test enquiry',
  formType: 'support',
};

async function testAPI() {
  try {
    console.log('🧪 Testing API...\n');
    
    // Test 1: Health check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await axios.get(API_BASE);
    console.log('✅ Health check response:', healthResponse.data);
    
    if (healthResponse.data.database !== 'Connected') {
      console.error('❌ Database not connected! Please check MongoDB connection.');
      return;
    }
    
    console.log('\n');
    
    // Test 2: Submit enquiry
    console.log('2️⃣ Testing form submission...');
    console.log('Sending data:', JSON.stringify(testData, null, 2));
    
    const submitResponse = await axios.post(`${API_BASE}/send-enquiry`, testData);
    console.log('✅ Submission response:', submitResponse.data);
    
    console.log('\n');
    console.log('🎉 All tests passed!');
    console.log('💡 Check your MongoDB database to verify the data was saved.');
    console.log('💡 Database name: royella (or as per your MONGO_URI)');
    console.log('💡 Collection name: enquiries');
    
  } catch (error) {
    console.error('\n❌ Test failed!');
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running?');
      console.error('Make sure to start the server: npm start');
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Run the test
console.log('='.repeat(60));
console.log('🧪 Backend API Test Script');
console.log('='.repeat(60));
console.log('\n');

testAPI();
