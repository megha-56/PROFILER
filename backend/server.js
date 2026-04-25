import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/db/connectDb.js';
import userRoutes from './src/routes/user.routes.js';


const app = express();

app.use(cors());
dotenv.config();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json()); 
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
    }
);

