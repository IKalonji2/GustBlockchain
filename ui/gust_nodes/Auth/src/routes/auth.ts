import { Router } from 'express';
import { otpVerifier, protectedRoute, userSignIn, userSignUp } from '../handlers/userManagement';

const router = Router();

router.post('/login', userSignIn);
router.post('/signUp', userSignUp);
router.get('/protected', protectedRoute);
router.post('/verifyOtp', otpVerifier);

export default router;
