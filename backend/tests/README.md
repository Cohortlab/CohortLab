This folder contains a small script to test the deployed CohortLab backend API.

Quick start:
1. Install deps (in backend folder):

   npm install axios form-data

2. Run the script:

   set BASE_URL=https://your-backend.onrender.com; node tests/prod-api-test.js

Or on PowerShell:

   $env:BASE_URL = 'https://cohortlab-backend.onrender.com/'; node tests/prod-api-test.js

The script runs health check and attempts to POST to newsletter, consultancy, book-call and developer endpoints. Adjust or extend as needed.
