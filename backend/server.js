import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import connectionToDb from './db/db.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(process.env.PORT, ()=> {
    connectionToDb();
    console.log(`Server is running on port ${process.env.PORT}`);
});