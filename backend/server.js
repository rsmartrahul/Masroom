import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import mushroomRoutes from './routes/mushroomRoutes.js';
import productRoutes from './routes/productRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { globalErrorHandler, AppError } from './middlewares/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to Database (forces nodemon reload)
connectDB();

const app = express();

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded files as static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/mushrooms', mushroomRoutes);
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hybrid business platform backend service is healthy and running.',
    timestamp: new Date().toISOString(),
  });
});

// Fallback Route Handler for unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler Middleware
app.use(globalErrorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`\x1b[32m[Server] Server is running in ${process.env.NODE_ENV || 'development'} mode on port: ${PORT}\x1b[0m`);
});
