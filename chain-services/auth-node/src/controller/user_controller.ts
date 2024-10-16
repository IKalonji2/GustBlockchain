import { Request, Response } from 'express';
import { UserService } from '../services/user_service';
import { OTPService } from '../services/otp_service';
import { hashPhoneNumber } from '../utils/encrypter';
import { generateOtp } from '../utils/otp_util';
import { generateJwt } from '../utils/jwt_util';
import { createWhatsAppClient, sendOtpWhatsApp } from '../utils/whatsapp_util';
import { storeOtp } from './otp_controller';
import { UserModel } from '../model/user_model';

const userService = new UserService();
const otpService = new OTPService();
const userModel = new UserModel();

// createWhatsAppClient().catch(console.error);

// export const userSignUp = async (req: Request, res: Response): Promise<any> => {
//     const { phone_number } = req.body;
    
//     if (!phone_number) {
//         return res.status(400).json({ message: 'Phone number is required.' });
//     }

//     const hashed = hashPhoneNumber(phone_number);
//     console.log(hashed);

//     const otp = generateOtp();
//     await storeOtp(phone_number, otp);
//     const jwt = generateJwt(hashed.hashedPhoneNumber);
//     try {
//         const result = await userModel.createUser(hashed.hashedPhoneNumber, hashed.salt, jwt);
//         console.log(hashed.hashedPhoneNumber, hashed.salt)
//         await sendOtpWhatsApp(phone_number, otp);
//         res.status(201).json({ id: result.lastID, message: 'OTP sent to your WhatsApp.' });
//     } catch (error) {
//         console.error("Error signing up user:", error);
//         res.status(500).json({ message: 'Error signing up user', error });
//     }
// };
export const userSignUp = async (req: Request, res: Response): Promise<any> => {
    const { phone_number } = req.body;

    if (!phone_number) {
        return res.status(400).json({ message: 'Phone number is required.' });
    }

    try {
        const user = await userService.createUser(phone_number);
        const otp = await otpService.sendOtp(phone_number);        
        return res.status(201).json({ userId: user.id, message: 'OTP sent to WhatsApp.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error signing up user', error });
    }
};

export const userLogin = async (req: Request, res: Response): Promise<any>  => {
    const { phone_number } = req.body;

    if (!phone_number) {
        return res.status(400).json({ message: 'Phone number is required.' });
    }

    try {
        const user = await userService.findUserByPhoneNumber(phone_number);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const otp = await otpService.sendOtp(phone_number);
        return res.status(200).json({ message: 'OTP sent to WhatsApp.' });
    } catch (error) {
        return res.status(500).json({ message: 'Login failed', error });
    }
};

export const verifyOtp = async (req: Request, res: Response): Promise<any>  => {
    const { phone_number, otp } = req.body;

    if (!phone_number || !otp) {
        return res.status(400).json({ message: 'Phone number and OTP are required.' });
    }

    try {
        const isValidOtp = await otpService.verifyOtp(phone_number, otp);
        console.log(isValidOtp);
        if (!isValidOtp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        const token = userService.generateJwt(phone_number);
        // res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.cookie('token', token, {
            httpOnly: true,     
            secure: true,        
            sameSite: 'strict',  
            maxAge: 3600000    
        });

        return res.status(200).json({ message: 'OTP verified successfully.', token });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to verify OTP.', error });
    }
};
