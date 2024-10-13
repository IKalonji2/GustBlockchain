import { Request, Response } from "express";
import dotenv from 'dotenv';
import { sendOtpEmail } from "../services/mail_service";
import { createWhatsAppClient, sendOtpWhatsApp } from '../services/whatsapp_service';
import { generateOtp } from "../services/otp_service";

import jwt from 'jsonwebtoken';
import {createMnemonic, createWallet } from "../services/wallet_creation_service";
import { shuffle } from '../utils/shuffler';


const users: Record<string, string> = {}; // Locally stored OTPs
createWhatsAppClient().catch(console.error);
dotenv.config();


let mnemonic: string | null = null;

export const userSignUp = async (req: Request, res: Response): Promise<void> => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
       res.status(400).json({ message: 'Email or phone number is required.' });
    }

    const otp = generateOtp();

    if (email) {
        if (users[email]) {
           res.status(400).json({ message: 'User email already exists.' });
        }
        users[email] = otp;

        try {
            await sendOtpEmail(email, otp);
            res.json({ message: 'OTP sent to your email.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send OTP via email', error });
        }
    } else if (phoneNumber) {
        if (users[phoneNumber]) {
           res.status(400).json({ message: 'Phone number already exists.' });
        }
        users[phoneNumber] = otp;

        try {
            await sendOtpWhatsApp(phoneNumber, otp);
            res.json({ message: 'OTP sent to your WhatsApp.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send OTP via WhatsApp', error });
        }
    }
};

export const userSignIn = async (req: Request, res: Response): Promise<void>  => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        res.status(400).json({ message: 'Email or phone number is required.' });
    }

    const otp = generateOtp();

    if (email) {
        const storedOtp = users[email];
        if (!storedOtp) {
            res.status(400).json({ message: 'User not found.' });
        }
        users[email] = otp;

        try {
            await sendOtpEmail(email, otp);
            res.json({ message: 'OTP sent to your email.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send OTP via email', error });
        }
    } else if (phoneNumber) {
        const storedOtp = users[phoneNumber];
        if (!storedOtp) {
            res.status(400).json({ message: 'User not found.' });
        }
        users[phoneNumber] = otp;

        try {
            await sendOtpWhatsApp(phoneNumber, otp)
            res.json({ message: 'OTP sent to your WhatsApp.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send OTP', error });
        }
    }
};

export const otpVerifier = async (req: Request, res: Response): Promise<void> => {
    const { email, phoneNumber, otp } = req.body;

    console.log('Received OTP:', otp);
    console.log('Email or Phone:', email || phoneNumber);

    if (!otp || (!email && !phoneNumber)) {
        res.status(400).json({ message: 'OTP, and either email or phone number, is required.' });
    }

    const storedOtp = email ? users[email] : users[phoneNumber];

    if (!storedOtp || storedOtp !== otp) {
        res.status(400).json({ message: 'Invalid OTP.' });
    }

    const token = jwt.sign({ email: email || phoneNumber }, process.env.JWT_SECRET as string || 'the-fallback-secret', { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000
    });
    res.json({ message: 'OTP verification successful.', token });
};

export const sendMnemonic = async (req: Request, res: Response): Promise<void> => {
    mnemonic = createMnemonic();
    res.json({ mnemonic });
};

export const sendShuffledMnemonic = async (req: Request, res: Response): Promise<void> => {
    if (mnemonic) {
        const shuffledMnemonic = shuffle(mnemonic.split(' ')).join(' ');
        console.log("Shuffled mnemonic:", shuffledMnemonic);
        res.json({ shuffledMnemonic });
    } else {
        res.status(400).json({ error: 'Mnemonic not found. Please request the mnemonic first.' });
    }
};

export const verifyMnemonic = async (req: Request, res: Response): Promise<void> => {
    const userArrangement = req.body.mnemonic;
    console.log("User's arrangement of mnemonic:", userArrangement);

    if (!mnemonic) {
        res.status(400).json({ error: 'Mnemonic not found. Please request the mnemonic first.' });
        return;
    }

    const originalMnemonicArray = mnemonic.split(' ');
    const userMnemonicArray = userArrangement.split(' ');

    if (JSON.stringify(originalMnemonicArray) === JSON.stringify(userMnemonicArray)) {
        const wallet = await createWallet();
        console.log('Wallet created:', wallet.address);

        res.json({ message: 'Mnemonic verified successfully!', walletAddress: wallet.address });
    } else {
        res.status(400).json({ error: 'Mnemonic verification failed. Please try again.' });
    }
};

export const getWallet = (req: Request, res: Response): void => {
    const wallet = localStorage.getItem('Wallet Address'); 
    res.json({ "Wallet Address": wallet });
};
  
// export const generateJWT = (email:string, phoneNumber:string) => {
//     if(email) {
//         const token = jwt.sign(
//             users[email],
//             process.env.JWT_SECRET as string,
//             { expiresIn: '1h' }
//         );
        
//     }
//     else if(phoneNumber) {
//         const token = jwt.sign(
//             users[phoneNumber],
//             process.env.JWT_SECRET!,
//             { expiresIn: '1h' }
//         );
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'strict',
//             maxAge: 3600000
//         });
//     }
//   };