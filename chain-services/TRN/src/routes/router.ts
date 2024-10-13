import { Router } from "express";
import { authenticateJWT, relayTransaction } from "../services/userAccessManagement";

const router = Router();

router.post('/verifyToken', authenticateJWT);
router.post('/createWallet', relayTransaction);

export default router;
