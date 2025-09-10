# CohortLab Backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Environment Setup:
   - Copy `.env.example` to `.env`
   - Update environment variables as needed

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## API Endpoints

### Newsletter API

#### Subscribe to Newsletter
- **POST** `/api/newsletter/subscribe`
- **Body**: `{ "name": "John Doe", "email": "john@example.com", "source": "blog_page" }`
- **Response**: Success/Error message with subscriber data

#### Get Subscription Stats
- **GET** `/api/newsletter/stats`
- **Response**: Total, active, and inactive subscriber counts

#### Get Subscribers (Admin)
- **GET** `/api/newsletter/subscribers?page=1&limit=10`
- **Response**: Paginated list of active subscribers

#### Unsubscribe
- **POST** `/api/newsletter/unsubscribe`
- **Body**: `{ "email": "john@example.com" }`

### Health Check
- **GET** `/health`
- **Response**: Server status and information

## Database Schema

### Newsletter Subscribers
- `name`: String (required, 2-100 chars)
- `email`: String (required, unique, valid email)
- `subscriptionDate`: Date (auto-generated)
- `isActive`: Boolean (default: true)
- `source`: String (blog_page, homepage, footer, popup, other)
- `preferences`: Object (topic preferences)
- `metadata`: Object (IP, user agent, referrer)

## Features

- ✅ MongoDB integration with Mongoose
- ✅ Input validation and sanitization
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ Error handling and logging
- ✅ Duplicate email handling
- ✅ Subscriber reactivation
- ✅ Pagination for admin endpoints
- ✅ Environment-based configuration
- ✅ Graceful shutdown

## Environment Variables

```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=cohortlab
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## Testing

Test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl https://cohortlab-backend.onrender.com/health

# Subscribe to newsletter
curl -X POST https://cohortlab-backend.onrender.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get stats
curl https://cohortlab-backend.onrender.com/api/newsletter/stats
```
