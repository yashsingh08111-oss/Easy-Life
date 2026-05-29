# Quick Reference Guide - Easy Life Service Marketplace

## 🚀 Quick Start

### First Time Setup
```bash
cd "Easy Life"
npm run install-all
cd backend
npm run prisma:migrate
```

### Running Development Servers
```bash
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database UI: http://localhost:5555 (run `cd backend && npm run prisma:studio`)

## 📂 Project Structure Quick Reference

```
Backend API        → /backend/server.js (port 5000)
Frontend App       → /frontend/src/App.jsx (port 3000)
Database Schema    → /prisma/schema.prisma
Configuration      → /.env
Documentation      → /README.md
Deployment Guide   → /DEPLOYMENT.md
```

## 🔌 API Endpoints Quick Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Services
```
GET    /api/services              (search, filter)
POST   /api/services              (create, auth required)
GET    /api/services/:id          (get details)
PUT    /api/services/:id          (update, auth required)
DELETE /api/services/:id          (delete, auth required)
```

### Bookings
```
GET    /api/bookings              (auth required)
POST   /api/bookings              (auth required)
PUT    /api/bookings/:id          (auth required)
DELETE /api/bookings/:id          (auth required)
```

## 📦 Common Commands

### Backend Commands
```bash
cd backend
npm run dev                 # Development server
npm start                   # Production server
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open database UI
npm run prisma:generate    # Generate Prisma client
```

### Frontend Commands
```bash
cd frontend
npm run dev                 # Development server
npm run build              # Production build
npm run preview            # Preview production build
```

### Root Commands
```bash
npm run install-all        # Install all dependencies
npm run dev                # Run both backend & frontend
npm run migrate            # Run database migration
npm run studio             # Open Prisma Studio
```

## 🔐 Authentication

### Register New User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "customer"  // or "worker"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "customer" }
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "customer" }
}
```

### Using Token in Requests
```
Header: Authorization: Bearer <token>
```

## 📊 Database Schema Quick Reference

### User Table
```
id (int) - primary key
name (string)
email (string) - unique
password (string)
phone (string, optional)
role (string) - "customer", "worker", "admin"
createdAt (timestamp)
updatedAt (timestamp)
```

### Service Table
```
id (int) - primary key
title (string)
description (string)
price (float)
category (string)
providerId (int) - foreign key to User
createdAt (timestamp)
updatedAt (timestamp)
```

### Booking Table
```
id (int) - primary key
status (string) - "pending", "confirmed", "completed", "cancelled"
serviceId (int) - foreign key to Service
customerId (int) - foreign key to User
workerId (int, optional) - foreign key to Worker
location (string, optional)
scheduledAt (datetime, optional)
totalPrice (float)
createdAt (timestamp)
updatedAt (timestamp)
```

### Worker Table
```
id (int) - primary key
userId (int) - foreign key to User
experience (string, optional)
rating (float) - default 0
createdAt (timestamp)
updatedAt (timestamp)
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot find module | Run `npm run install-all` |
| Database connection fails | Check MySQL running, verify DATABASE_URL |
| Port 5000 already in use | Change PORT in .env or kill process on port |
| Prisma migration fails | Run `npx prisma db push` or `npx prisma migrate reset` |
| Frontend doesn't load | Check `http://localhost:3000` is accessible |
| API calls fail with 401 | Token missing or expired, re-login |

## 💡 Environment Variables

```env
DATABASE_URL           # MySQL connection string
PORT                   # Server port (default: 5000)
NODE_ENV               # development or production
JWT_SECRET             # Secret key for JWT signing
API_URL                # Backend API URL
CORS_ORIGIN            # Frontend URL for CORS
```

## 📋 Common Development Tasks

### Create a New Service
```javascript
// Frontend: src/services/api.js
const response = await servicesAPI.create({
  title: "Cleaning Service",
  description: "Professional cleaning",
  price: 50,
  category: "cleaning"
});
```

### Get All Bookings
```javascript
const response = await bookingsAPI.getAll();
const bookings = response.data.bookings;
```

### Update Booking Status
```javascript
const response = await bookingsAPI.update(bookingId, {
  status: "completed"
});
```

## 🔒 Security Reminders

- ⚠️ Never commit `.env` file
- ⚠️ Keep JWT_SECRET secret
- ⚠️ Always validate user input
- ⚠️ Use HTTPS in production
- ⚠️ Enable CORS only for trusted domains
- ⚠️ Keep dependencies updated: `npm audit fix`

## 📚 Documentation Files

- `README.md` - Full setup and API documentation
- `DEPLOYMENT.md` - Production deployment guide
- `SERVICES_READY_SUMMARY.md` - Change summary
- `QUICK_REFERENCE.md` - This file

## 🎯 Next Steps

1. ✅ Install dependencies: `npm run install-all`
2. ✅ Set up database: `cd backend && npm run prisma:migrate`
3. ✅ Start development: `npm run dev`
4. ✅ Create test user account
5. ✅ Test API endpoints
6. ✅ Build frontend: `cd frontend && npm run build`
7. ✅ Deploy to production

## 📞 Quick Links

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)

---

**Last Updated**: May 2026
**Status**: Service Ready ✅
