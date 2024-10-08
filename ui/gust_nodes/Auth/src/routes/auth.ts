import { Router } from 'express';
import { protectedRoute, userSignIn, userSignUp } from '../handlers/userManagement';

const router = Router();

router.post('/login', userSignIn);
router.post('/signUp', userSignUp);
router.get('/protected', protectedRoute);

export default router;
