/*
Simple production API tester for CohortLab backend.
Usage:
  Set BASE_URL to your deployed API base (example: https://cohortlab-backend.onrender.com)
  node prod-api-test.js

This script runs a health check and then attempts POSTs for three endpoints.
It uses only axios so run `npm install axios form-data` in this folder or globally.
*/

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || process.argv[2] || 'https://YOUR_BACKEND_URL';
if (BASE_URL.includes('YOUR_BACKEND_URL')) {
  console.error('Please set BASE_URL environment variable or pass it as the first argument');
  process.exit(1);
}

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 15000
});

async function health() {
  console.log('\n== health check ==');
  try {
    const res = await client.get('/health');
    console.log('status:', res.status, 'body:', res.data);
  } catch (err) {
    console.error('health check failed:', err.message, err.response ? err.response.data : '');
  }
}

async function newsletterSubscribe() {
  console.log('\n== newsletter subscribe ==');
  try {
    const body = {
      name: 'API Tester',
      email: `apitest+${Date.now()}@example.com`,
      source: 'homepage'
    };
    const res = await client.post('/api/newsletter/subscribe', body, { headers: { 'Content-Type': 'application/json' } });
    console.log('status:', res.status, 'body:', res.data);
  } catch (err) {
    console.error('newsletter subscribe failed:', err.message, err.response ? err.response.data : '');
  }
}

async function consultancy() {
  console.log('\n== consultancy request ==');
  try {
    const body = {
      fullName: 'API Tester',
      email: `consult-${Date.now()}@example.com`,
      phoneNumber: '+1234567890',
      serviceInterest: 'web-development',
      message: 'Testing production consultancy endpoint.'
    };
    const res = await client.post('/api/consultancy', body);
    console.log('status:', res.status, 'body:', res.data);
  } catch (err) {
    console.error('consultancy failed:', err.message, err.response ? err.response.data : '');
  }
}

async function bookCall() {
  console.log('\n== book-call request ==');
  try {
    const preferred = new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow
    const body = {
      fullName: 'API Tester',
      email: `call-${Date.now()}@example.com`,
      phoneNumber: '+1234567890',
      preferredDateTime: preferred.toISOString(),
      topicDiscussion: 'Testing booking endpoint',
      additionalNotes: 'ignore'
    };
    const res = await client.post('/api/book-call', body);
    console.log('status:', res.status, 'body:', res.data);
  } catch (err) {
    console.error('book-call failed:', err.message, err.response ? err.response.data : '');
  }
}

async function developerNoFile() {
  console.log('\n== developer application (no file, using resumeGoogleDriveUrl) ==');
  try {
    const body = {
      name: 'Dev Tester',
      email: `dev-${Date.now()}@example.com`,
      contactNumber: '+1234567890',
      githubUrl: 'https://github.com/testuser',
      liveProjects: 'https://example.com/project1, https://example.com/project2',
      techStack: 'Node.js, React, MongoDB, Express',
      linkedinUrl: 'https://linkedin.com/in/testuser',
      portfolioWebsite: 'https://testportfolio.com',
      resumeGoogleDriveUrl: 'https://drive.google.com/file/d/placeholder/view'
    };
    const res = await client.post('/api/developer', body);
    console.log('status:', res.status, 'body:', res.data);
  } catch (err) {
    console.error('developer submit failed:', err.message, err.response ? err.response.data : '');
  }
}

async function main() {
  await health();
  await newsletterSubscribe();
  await consultancy();
  await bookCall();
  await developerNoFile();
  console.log('\nDone.');
}

main();
