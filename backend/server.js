import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import errorHandler from './middleware/errorHandler.js';

// Route files — all versioned under /api/v1/
import authRoutes from './routes/v1/authRoutes.js';
import doctorRoutes from './routes/v1/doctorRoutes.js';
import appointmentRoutes from './routes/v1/appointmentRoutes.js';
import adminRoutes from './routes/v1/adminRoutes.js';
import analyticsRoutes from './routes/v1/analyticsRoutes.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// connect to database and cloudinary
connectDB();
connectCloudinary();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'], // Only allow the frontend origin
  credentials: true,
}));

// Body parsing
app.use(express.json());

// Rate limiting on auth routes (prevents brute-force login attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,                  // 20 requests per window
  message: { success: false, message: 'Too many attempts, try again later' },
});

// Routes — all under /api/v1/ prefix
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'CareHub API is running' });
});

// Centralized error handling (must be AFTER routes)
app.use(errorHandler);

app.listen(port, () => console.log(`CareHub API running on port ${port}`));