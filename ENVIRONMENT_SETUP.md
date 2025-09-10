# Environment Configuration Guide

This project uses environment variables to handle different deployment environments (development and production).

## Environment Files Structure

### Backend
- `.env` - Development environment variables
- `.env.production` - Production environment variables (for deployment)

### Frontend  
- `.env.local` - Development environment variables
- `.env.production` - Production environment variables (for deployment)

## URLs Configuration

### Development
- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:3000`

### Production
- Backend API: `https://cohortlab-backend.onrender.com`
- Frontend: `https://cohort-lab.vercel.app`

## Setup Instructions

### 1. Local Development
For local development, the `.env` and `.env.local` files are already configured.

#### Backend (.env):
```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ENVIRONMENT=development
```

### 2. Production Deployment

#### For Render (Backend):
Set these environment variables in Render dashboard:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=https://cohort-lab.vercel.app
```

#### For Vercel (Frontend):
Set these environment variables in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://cohortlab-backend.onrender.com/api
NEXT_PUBLIC_ENVIRONMENT=production
```

## Usage in Code

### Frontend
```javascript
// Using environment variable directly
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Or using the config helper
import getConfig from '@/lib/config';
const config = getConfig();
const apiUrl = config.api.baseUrl;
```

### Backend
```javascript
const frontendUrl = process.env.FRONTEND_URL;
const dbUrl = process.env.MONGODB_URI;
```

## Benefits

1. **Automatic Environment Detection**: Code automatically uses correct URLs based on environment
2. **Easy Local Development**: Run locally without changing any URLs
3. **Production Ready**: Deploy without manual URL changes
4. **Security**: Sensitive data in environment variables, not in code
5. **Flexibility**: Easy to add new environments or change URLs

## Testing

### Local Testing:
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Both should connect automatically using localhost URLs

### Production Testing:
- Frontend will automatically use production API URLs when deployed
- Backend will accept requests from both local and production frontend URLs

## Troubleshooting

If you encounter CORS issues:
1. Check that environment variables are set correctly
2. Verify URLs don't have trailing slashes
3. Ensure both environments are using HTTPS in production
