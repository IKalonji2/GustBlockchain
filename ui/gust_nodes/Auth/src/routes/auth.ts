import { Router } from 'express';
import { otpVerifier, userSignIn, userSignUp } from '../handlers/userManagement';

const router = Router();

router.post('/login', userSignIn);
router.post('/signUp', userSignUp);
router.post('/verifyOtp', otpVerifier);

export default router;
