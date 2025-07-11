require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes dan middleware
const usersRoutes = require("./routes/users");
const middlewareLogRequest = require("./middleware/logs");

// MongoDB Connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.log('MongoDB URI not found, running without database');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Jangan exit di production, biarkan app tetap jalan
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Connect to database
connectDB();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4000',
      process.env.FRONTEND_URL, // URL frontend production
      // Tambahkan domain frontend production Anda di sini
    ].filter(Boolean); // Remove undefined values
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware (tetap pakai yang lama)
app.use((req, res, next) => {
  console.log("middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("middleware 2");
  next();
});

// Routes
app.use("/routes/users", usersRoutes);

// Health check routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World! API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      error: 'CORS policy violation',
      message: 'Origin not allowed'
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});