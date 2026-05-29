# Easy Life - Service Marketplace Application

A full-stack service marketplace application built with **Node.js/Express** backend and **React** frontend, using **Prisma ORM** with **MySQL** database.

## 📋 Table of Contents
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Setup](#database-setup)
- [Deployment](#deployment)

## 📁 Project Structure

```
easy-life/
├── backend/              # Node.js/Express API
│   ├── config/          # Database configuration
│   ├── controller/      # Route controllers
│   ├── midlleware/      # Express middleware
│   ├── models/          # Database models (deprecated - use Prisma)
│   ├── Routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── server.js        # Entry point
│   └── package.json     # Dependencies
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── vite.config.js   # Vite configuration
│   ├── index.html       # HTML template
│   └── package.json     # Dependencies
├── prisma/              # Prisma configuration
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables
├── .env.example         # Environment variables template
└── package.json         # Root package scripts
```

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Prisma
- **Database**: MySQL
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router (to be configured)
- **Styling**: CSS

### Database
- **Type**: MySQL
- **Models**: User, Service, Booking, Worker

## 📦 Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)
- **Git**

## 🚀 Installation

### 1. Clone or extract the project
```bash
cd Easy\ Life
```

### 2. Install dependencies for all packages
```bash
npm run install-all
```

This will install:
- Root dependencies
- Backend dependencies
- Frontend dependencies

### 3. Individual installation (if needed)
```bash
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## ⚙️ Configuration

### 1. Database Setup

Ensure MySQL is running locally. Update `.env` with your database credentials:

```env
DATABASE_URL="mysql://username:password@localhost:3306/serviceapp"
```

Create the database:
```bash
mysql -u root -p
CREATE DATABASE serviceapp;
EXIT;
```

### 2. Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

**Required environment variables:**
```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/serviceapp"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET="your-strong-secret-key"

# API
API_URL="http://localhost:5000"
CORS_ORIGIN="http://localhost:3000"
```

### 3. Prisma Migration

Run database migrations to create tables:

```bash
cd backend
npm run prisma:migrate
```

When prompted, enter a migration name (e.g., `init`).

This will:
- Create all required tables in MySQL
- Generate Prisma Client

## 🏃 Running the Application

### Option 1: Run Both Backend & Frontend Concurrently
```bash
npm run dev
```

This starts:
- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:3000`

### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend (in another terminal):**
```bash
cd frontend
npm run dev
```

### Option 3: Production Build

**Build frontend:**
```bash
cd frontend
npm run build
```

**Start backend in production:**
```bash
cd backend
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (authenticated)
- `PUT /api/services/:id` - Update service (authenticated)
- `DELETE /api/services/:id` - Delete service (authenticated)

### Bookings
- `GET /api/bookings` - List user bookings (authenticated)
- `POST /api/bookings` - Create booking (authenticated)
- `PUT /api/bookings/:id` - Update booking status (authenticated)
- `DELETE /api/bookings/:id` - Cancel booking (authenticated)

### Health Check
- `GET /api/health` - Server health status

## 🗄️ Database Management

### Prisma Studio (Visual Database Browser)
```bash
cd backend
npm run prisma:studio
```

Opens a web interface at `http://localhost:5555` to browse and edit database records.

### View Database Migrations
```bash
ls backend/prisma/migrations/
```

## 🚢 Deployment Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Use a production MySQL database (not local)
- [ ] Configure CORS_ORIGIN for frontend domain
- [ ] Set up SSL/HTTPS
- [ ] Configure environment variables on server
- [ ] Run `npm run prisma:migrate` on production
- [ ] Build frontend: `npm run build`
- [ ] Use PM2 or similar for process management
- [ ] Set up database backups
- [ ] Configure logging and monitoring

## 📝 Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution:** Ensure all dependencies are installed
```bash
npm run install-all
```

### Issue: Prisma migration fails
**Solution:** Check database connection
```bash
# Test connection
cd backend
npx prisma db push
```

### Issue: CORS errors
**Solution:** Update CORS_ORIGIN in `.env` to match frontend URL

### Issue: Port already in use
**Solution:** Change PORT in `.env` or kill existing process
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

## 🔒 Security Notes

1. **Never commit `.env` file** - Use `.env.example` template
2. **Change default JWT_SECRET** before production
3. **Use HTTPS** in production
4. **Validate all user inputs**
5. **Use strong database passwords**
6. **Enable CORS only for trusted domains**
7. **Keep dependencies updated**: `npm audit fix`

## 📚 Additional Documentation

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)

## 📞 Support

For issues or questions, check the logs:
```bash
# Backend logs
cd backend && npm run dev

# Frontend logs (in browser console)
F12 → Console tab
```

## 📄 License

MIT License

---

**Last Updated**: May 2026
