import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import connectionToDb from './db/db.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workouts', workoutRoutes);


app.listen(process.env.PORT, ()=> {
    connectionToDb();
    console.log(`Server is running on port ${process.env.PORT}`);
});