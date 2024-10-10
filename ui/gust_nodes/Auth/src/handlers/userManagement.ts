import { Request, Response } from "express";
import { sendOtpEmail } from "../services/mail_service";
import { createWhatsAppClient, sendOtpWhatsApp } from '../services/whatsapp_service';
import { generateOtp } from "../services/otp_service";

import jwt from 'jsonwebtoken';

const users: Record<string, string> = {}; // Locally stored OTPs
createWhatsAppClient().catch(console.error);

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


export const protectedRoute = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(401).json({ message: 'Missing token' });
    }

    const token = authHeader && authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET as string);
         res.json({ message: 'Access granted!', user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
export const otpVerifier = async (req: Request, res: Response): Promise<void> => {
    const { email, phoneNumber, otp } = req.body;
  
    if (!otp || (!email && !phoneNumber)) {
      res.status(400).json({ message: 'OTP, and either email or phone number, is required.' });
    }
  
    const storedOtp = email ? users[email] : users[phoneNumber];
  
    if (!storedOtp || storedOtp !== otp) {
      res.status(400).json({ message: 'Invalid OTP.' });
    }
  
    res.json({ message: 'OTP verification successful.' });
  };
  