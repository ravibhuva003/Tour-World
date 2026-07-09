import express from 'express';
import { 
    register, 
    login, 
    verifyOTP, 
    googleAuth, 
    facebookAuth, 
    forgotPassword, 
    resetPassword 
} from './../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/google', googleAuth);
router.post('/facebook', facebookAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;