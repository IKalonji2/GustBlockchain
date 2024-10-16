import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user_routes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', userRoutes);

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

  app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
