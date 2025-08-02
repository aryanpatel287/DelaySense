# 🚀 DelaySense Masterplan
A real-time delay impact and SKU prioritization platform tailored for large-scale retail logistics (e.g. Walmart).

---

## 📌 Objective
Build a scalable, real-time dashboard that helps store managers identify, understand, and act on the impact of delayed deliveries—especially at the SKU level—to reduce loss, improve cold-chain handling, and optimize return pickups.

---

## 🧩 Core Features

### 1. Delay Detection Engine
- Compares ETA vs ATA of each truck.
- Flags delays (> threshold minutes)
- Maps truck to store and origin DC.

### 2. SKU Impact Analyzer
- Pulls digital manifest of each delayed truck.
- Cross-references delayed SKUs with store's shelf/backroom stock.
- Tags SKUs as:
  - Out-of-stock
  - Cold-chain
  - Pickup-linked
  - Perishable

### 3. Loss Estimator
Calculates per-SKU estimated loss:

```
loss = demand_rate x delay_time x unit_price
```

- Aggregates total loss per store, per truck, per region.

### 4. Action Recommendation System
- Suggests prioritized unload order.
- Flags critical cold chain & high-demand SKUs.
- Notifies pickup order handlers if delays affect fulfillment.

### 5. Return Pickup Prioritizer
- Identifies ready-to-return SKUs in backroom.
- Scores return value based on urgency, condition, and resale value.
- Suggests optimal return items to send back based on truck space and return value.
- **Prioritizes return items that must be delivered to vendors urgently (e.g., time-bound recalls, vendor return SLAs).**
- Flags high-priority vendor-bound returns that could be impacted by inbound truck delays, enabling smarter reverse logistics.

### 6. Live Dashboard & Visuals
- Interactive store map with delay markers.
- Popup with:
  - Delay time
  - Est. loss
  - Top SKUs
  - Action suggestions
- Charts:
  - SKU loss trends
  - Cold vs dry item breakdown

---

## 🎨 UI/UX Layout Plan

### Top Section
- Summary Tiles:
  - Total Delays
  - Est. Loss Today

### Middle Section
- Option A: Split View
  - Left: Interactive Map (Leaflet)
  - Right: Store/Truck detail panel

### Bottom Section
- Charts:
  - Weekly Loss Trend
  - Top 5 SKUs at Risk
  - Store Loss Leaderboard

---

## ⚙ Tech Stack

| Layer    | Tools                     |
|----------|---------------------------|
| Frontend | React.js + Tailwind CSS   |
| Charts   | Chart.js or Recharts      |
| Backend  | Node.js + Express         |
| DB       | PostgreSQL / Firebase     |
| Realtime | Socket.IO (optional)      |
| Hosting  | Vercel (FE) + Railway     |

---

## 🎯 End Users
- Primary: Store Operations Manager

---

## 🔁 Future Expansion
- Predictive delay forecasting (ML)
- Vendor scoring & accountability
- Sustainability: carbon saved via optimizations
- Deep DC dispatch integration

---

### 🧭 Navigation Outline
- 🚀 DelaySense Masterplan
- 📌 Objective
- 🧩 Core Features
  - 1. Delay Detection Engine
  - 2. SKU Impact Analyzer
  - 3. Loss Estimator
  - 4. Action Recommendation System
  - 5. Return Pickup Prioritizer
  - 6. Live Dashboard & Visuals
- 🎨 UI/UX Layout Plan
  - Top Section
  - Middle Section
  - Bottom Section
- ⚙️ Tech Stack
- 🎯 End Users
- 🔁 Future Expansion


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

**Install dependencies**
   
1.bash
   npm run install-all

2.**Set up environment variables**
   
bash
   # Copy the example file
   cp env.example .env
   
   # Edit .env and set your JWT secret
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   NODE_ENV=development

4. **Start the development servers**
   
bash
   npm run dev

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

## 📁 Project Structure

delaysense-login/
├── client/                      # Frontend (React)
│   ├── public/                  # Static files like index.html, favicon
│   ├── src/
│   │   ├── assets/             # Images, icons, logos, etc.
│   │   ├── components/         # Reusable React components
│   │   ├── contexts/           # React Context API providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components (Login, Dashboard, etc.)
│   │   ├── services/           # API calls (axios)
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx             # Root app component
│   │   └── index.js            # Entry point (ReactDOM)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── vite.config.js          # Or webpack.config.js if using Webpack
│
├── server/                     # Backend (Node.js + Express)
│   ├── config/                 # DB & environment setup
│   │   └── db.js               # SQLite DB connection logic
│   ├── controllers/           # Route logic (e.g. authController.js)
│   ├── middlewares/           # Middleware (auth, error handlers)
│   ├── models/                # DB models or schema helpers
│   ├── routes/                # Express routers (auth, users)
│   ├── services/              # Business logic (e.g. password hashing)
│   ├── utils/                 # Helper functions (tokens, validations)
│   ├── index.js               # Main server file (Express setup)
│   ├── .env                   # Local environment variables
│   └── database.sqlite        # SQLite file (auto-created)
│
├── .gitignore                 # Git ignore rules
├── env.example                # Sample .env file
├── README.md                  # Project documentation
└── package.json               # Root package.json (optional if monorepo)


## 🔧 Available Scripts

### Root Directory
- npm run dev - Start both frontend and backend in development mode
- npm run server - Start only the backend server
- npm run install-all - Install dependencies for both frontend and backend

### Client Directory
- npm start - Start React development server
- npm run build - Build for production
- npm test - Run tests

## 🌐 API Endpoints

### Authentication
- POST /api/register - Register a new user
- POST /api/login - Login user
- POST /api/logout - Logout user
- GET /api/profile - Get user profile (protected)

### Request/Response Examples

#### Register
json
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

#### Login
json
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
1. Set NODE_ENV=production in your environment variables
2. Update CORS origin in server/index.js to your domain
3. Use a strong JWT secret
4. Enable HTTPS in production
5. Build the frontend: cd client && npm run build

### Environment Variables for Production
bash
JWT_SECRET=your-very-long-and-secure-jwt-secret
PORT=5000
NODE_ENV=production

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

**Built with ❤️ from ByteBuilder**