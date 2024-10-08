import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import userAuth from './routes/auth';


dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use('/api',userAuth);

app.listen(3000, () => {
    console.log('Auth server running on http://localhost:3000');
});



