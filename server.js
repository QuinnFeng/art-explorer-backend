import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import artRoutes from './routes/artRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/art', artRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

