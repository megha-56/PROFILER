//We have made routes now connect them to our server(router-server connection)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/db/connectDb.js';
import userRoutes from './src/routes/user.routes.js'; //import Routes


const app = express();

app.use(cors());
dotenv.config();


//syntax for server
const PORT = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


       
app.use(express.json()); // userRoutes


app.use('/api/user',userRoutes); //userRoutes


app.listen(PORT, () => {
    connectDB(); // connected to mongodb
    console.log(`Server is running on port ${PORT}`);
    }
);

