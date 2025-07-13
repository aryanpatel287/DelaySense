# 🔐 DelaySense Login System

A secure, full-stack authentication system built with React, Express, and modern security practices.

## ✨ Features

### Frontend (React + Tailwind CSS)
- **Beautiful UI/UX** with modern design and smooth animations
- **Form Validation** using Formik + Yup for secure input validation
- **Password Strength Meter** with real-time feedback
- **Password Visibility Toggle** for better user experience
- **Responsive Design** that works on all devices
- **Protected Routes** with automatic redirects
- **Loading States** and error handling

### Backend (Express + Security)
- **Secure Authentication** with JWT tokens stored in httpOnly cookies
- **Password Hashing** using bcrypt with 12 salt rounds
- **Input Validation** with express-validator
- **Rate Limiting** to prevent brute force attacks
- **Security Headers** with Helmet middleware
- **CORS Protection** with proper configuration
- **SQLite Database** for data persistence

## 🛡️ Security Features

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcrypt (12 salt rounds) |
| JWT Tokens | httpOnly cookies, 1-hour expiration |
| Input Sanitization | express-validator |
| Brute Force Prevention | express-rate-limit |
| Security Headers | Helmet middleware |
| CORS Protection | Configured for production |
| Password Requirements | 8+ chars, uppercase, lowercase, number, special char |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd delaysense-login
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env and set your JWT secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

## 📁 Project Structure

```
delaysense-login/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── index.css       # Tailwind CSS
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   └── database.sqlite    # SQLite database (auto-created)
├── package.json           # Root package.json
├── env.example           # Environment variables template
└── README.md
```

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run install-all` - Install dependencies for both frontend and backend

### Client Directory
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌐 API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user
- `GET /api/profile` - Get user profile (protected)

### Request/Response Examples

#### Register
```json
POST /api/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```json
POST /api/login
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## 🔒 Security Best Practices

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### JWT Token Security
- Stored in httpOnly cookies (not accessible via JavaScript)
- 1-hour expiration
- Secure flag in production
- SameSite=Strict to prevent CSRF

### Rate Limiting
- 100 requests per 15 minutes per IP
- Applied to all API endpoints

## 🎨 UI Components

### Login Form
- Email and password fields with validation
- Password visibility toggle
- "Forgot password?" link
- Switch to register mode

### Register Form
- Name, email, password, and confirm password fields
- Real-time password strength meter
- Comprehensive validation feedback
- Switch to login mode

### Dashboard
- User information display
- Security status indicators
- Logout functionality
- Responsive design

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production` in your environment variables
2. Update CORS origin in `server/index.js` to your domain
3. Use a strong JWT secret
4. Enable HTTPS in production
5. Build the frontend: `cd client && npm run build`

### Environment Variables for Production
```bash
JWT_SECRET=your-very-long-and-secure-jwt-secret
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ for secure authentication** 