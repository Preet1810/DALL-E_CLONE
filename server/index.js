import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import dalleRoutes from './routes/dalleRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config()

const app=express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://63cfecd3a8f6d103523c0f07--neon-quokka-5605b1.netlify.app/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!')
});

const startServer=async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
        console.log(error);
    }
};

startServer();