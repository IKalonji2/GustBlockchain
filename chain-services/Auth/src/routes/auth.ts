import { Router } from 'express';
import { 
    otpVerifier, 
    userSignIn, 
    userSignUp, 
    sendMnemonic, 
    sendShuffledMnemonic, 
    getWallet, 
    verifyMnemonic 
} from '../handlers/userManagement';

const router = Router();

router.post('/login', userSignIn);
router.post('/signUp', userSignUp);
router.post('/verifyOtp', otpVerifier);
router.get('/sendMnemonic', sendMnemonic);
router.get('/shuffledMnemonic', sendShuffledMnemonic);
router.get('/getWallet', getWallet);
router.post('/verifyMnemonic', verifyMnemonic);


export default router;
