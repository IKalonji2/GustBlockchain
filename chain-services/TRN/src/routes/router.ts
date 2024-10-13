import { Router } from "express";
import { relayTransaction } from "../services/deploySmartContractRelayer";

const router = Router();

// router.post('/verifyToken', authenticateJWT);
// router.get('/connect', connectToChain);
router.post('/relay', relayTransaction);

export default router;
