import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import helmet from 'helmet';

import relayer from './routes/router'


dotenv.config();

const app = express();

app.use(express.json());
// app.use(helmet());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use('/api',relayer);

app.listen(3001, () => {
    console.log('Auth server running on http://localhost:3001');
});