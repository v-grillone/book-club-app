import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import bookClubRoutes from './routes/bookClubRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'

// Load enviroment variables
dotenv.config()

// Express server setup

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/', bookClubRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes)


// Database connection and server start
const startServer = async () => {
  try {
    await connectDB(); // wait for DB

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1); // stop app if DB fails
  }
};

startServer();