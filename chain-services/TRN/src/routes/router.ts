import { Router } from "express";
import { relayTransaction } from "../handlers/deploySmartContractRelayer";
import { topUpWalletRelay } from "../handlers/loadWallet";

const router = Router();

// router.post('/verifyToken', authenticateJWT);
router.get('/load-wallet', topUpWalletRelay);
router.post('/relay', relayTransaction);

export default router;
