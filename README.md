# 🌸 Bloom - Coupon Management System

A production-ready, full-stack coupon management application demonstrating modern web development practices. Built with React, TypeScript, and Node.js, featuring a responsive UI with smooth animations, comprehensive error handling, and a scalable backend architecture.

![Bloom Coupon Management](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=for-the-badge&logo=postgresql)

## ✨ Features

- 🎯 **Complete CRUD Operations** - Full coupon lifecycle management with validation
- 🎨 **Professional UI/UX** - Modern design with Framer Motion animations and loading states
- 📱 **Responsive Design** - Mobile-first approach with cross-device compatibility
- 🔒 **Type Safety** - Comprehensive TypeScript implementation with strict typing
- 🗄️ **Database Integration** - PostgreSQL with Prisma ORM and proper migrations
- ⚡ **Performance Optimized** - Efficient state management and API calls
- 🎪 **Smooth Animations** - Professional user experience with micro-interactions
- 📊 **Business Features** - Subscription plans, coupon integration, and analytics ready

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **React Hook Form** - Form management and validation
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **Prisma** - Modern database ORM
- **PostgreSQL** - Reliable database (via Supabase)
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd bloom
```

### 2. Install Dependencies

```bash
npm install
cd back && npm install
cd ..
```

### 3. Environment Setup

Create a `.env` file in the `back` directory:
```env
DATABASE_URL="postgresql://username:password@host:port/database"
PORT=3000
```

### 4. Database Setup
```bash
cd back
npx prisma generate
npx prisma db push
cd ..
```

### 5. Start Development Servers
```bash
npm run dev
```

This will start both frontend and backend concurrently:
- Frontend: `http://localhost:5173` (or next available port)
- Backend: `http://localhost:3000`

## 📁 Project Structure

```
bloom/
├── back/                    # Backend application
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   │   └── coupons/    # Coupon management
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Server entry point
│   ├── prisma/             # Database schema
│   └── package.json
├── src/                    # Frontend application
│   ├── components/         # Reusable components
│   ├── features/           # Feature modules
│   │   └── coupons/        # Coupon management
│   ├── pages/              # Page components
│   ├── api/                # API configuration
│   └── main.tsx           # App entry point
└── package.json
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/coupons` | Get all coupons |
| POST | `/api/coupons` | Create new coupon |
| PUT | `/api/coupons/:id` | Update coupon |
| DELETE | `/api/coupons/:id` | Delete coupon |
| GET | `/api/coupons/:id` | Get single coupon |

## 📊 Database Schema

```prisma
model Coupon {
  id             String       @id @default(uuid())
  code           String       @unique
  discount_type  DiscountType
  discount_value Float
  expiry_date    DateTime
  is_active      Boolean      @default(true)
  created_at     DateTime     @default(now())
  updated_at     DateTime     @updatedAt
}

enum DiscountType {
  PERCENTAGE
  FLAT
}
```

## 🎨 Technical Implementation

### Architecture & Design Patterns
- **Modular Structure** - Clean separation of concerns with feature-based organization
- **Type-Safe APIs** - Comprehensive TypeScript interfaces and validation
- **Error Boundaries** - Graceful error handling with user-friendly fallbacks
- **Performance Optimization** - Efficient re-renders and API call management
- **Code Quality** - ESLint configuration and consistent code formatting

### Frontend Excellence
- **Component Architecture** - Reusable, composable components with proper prop typing
- **State Management** - Custom hooks for API calls and local state
- **Form Handling** - React Hook Form with comprehensive validation
- **Routing** - Client-side routing with proper navigation guards
- **Animations** - Framer Motion for smooth, performant animations

### Backend Robustness
- **RESTful API Design** - Standard HTTP methods with proper status codes
- **Database Operations** - Prisma ORM with type-safe queries
- **Input Validation** - Comprehensive request validation and sanitization
- **Error Handling** - Structured error responses with meaningful messages
- **CORS Configuration** - Proper cross-origin resource sharing setup

## 🔧 Development

### Available Scripts

**Root (Frontend + Backend):**
```bash
npm run dev          # Start both frontend and backend concurrently
```

**Backend (in back/ directory):**
```bash
npm run dev          # Start backend development server with nodemon
npm test            # Run tests (placeholder)
```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL="your-postgresql-connection-string"
PORT=3000
```

---

**Built with ❤️ using modern web technologies**
