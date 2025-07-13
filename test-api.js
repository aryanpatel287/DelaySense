const axios = require('axios');

// Test the API endpoints
async function testAPI() {
  const baseURL = 'http://localhost:5000';
  
  try {
    console.log('Testing API endpoints...\n');
    
    // Test registration
    console.log('1. Testing registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'SecurePass123!'
    };
    
    try {
      const registerResponse = await axios.post(`${baseURL}/api/register`, registerData);
      console.log('✅ Registration successful:', registerResponse.data);
    } catch (error) {
      console.log('❌ Registration failed:', error.response?.data || error.message);
    }
    
    // Test login
    console.log('\n2. Testing login...');
    const loginData = {
      email: 'test@example.com',
      password: 'SecurePass123!'
    };
    
    try {
      const loginResponse = await axios.post(`${baseURL}/api/login`, loginData);
      console.log('✅ Login successful:', loginResponse.data);
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data || error.message);
    }
    
    // Test profile (should fail without auth)
    console.log('\n3. Testing profile without auth...');
    try {
      const profileResponse = await axios.get(`${baseURL}/api/profile`);
      console.log('✅ Profile accessible:', profileResponse.data);
    } catch (error) {
      console.log('❌ Profile access denied (expected):', error.response?.data?.message || error.message);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run the test
testAPI(); 