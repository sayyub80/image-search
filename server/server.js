
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import configurePassport from './config/passport.js';
import authRoutes from './routes/auth.routes.js';
import apiRoutes from './routes/api.routes.js';



connectDB();

configurePassport(passport);

const app = express();

// --- Middleware ---

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS - Allow frontend to access with credentials
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Express Session (without MongoDB store for now)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// --- Production Deployment ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Serve the index.html file for all non-api/auth routes
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'dist', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🔗 Frontend: ${process.env.CLIENT_URL || 'http://localhost:5173'}\n`);
  }
});