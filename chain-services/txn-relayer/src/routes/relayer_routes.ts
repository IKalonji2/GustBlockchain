import express from 'express';
import { signingAndSending } from '../controller/relayer_controller';
import { authenticateJwt } from '../services/auth_service';

const router = express.Router();

router.post('/relay-transaction',authenticateJwt, signingAndSending);

export default router;
