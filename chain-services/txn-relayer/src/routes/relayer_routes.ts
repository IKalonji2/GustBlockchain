import express from 'express';
import { deployingSmartContract, signingAndSending } from '../controller/relayer_controller';
import { authenticateJwt } from '../services/auth_service';

const router = express.Router();

router.post('/relay-transaction',authenticateJwt, signingAndSending);
router.post('/deploy-contract', authenticateJwt, deployingSmartContract);

export default router;
