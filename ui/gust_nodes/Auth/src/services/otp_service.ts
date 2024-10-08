import speakeasy from 'speakeasy';

export const generateOtp = () => {
    return speakeasy.totp({
        secret: process.env.JWT_SECRET || 'default_secret',
        encoding: 'base32',
        step: 300
    });
}

export const verifyOtp = (otp: string, userOtp: string): boolean => {
    return speakeasy.totp.verify({
        secret: process.env.JWT_SECRET || 'default_secret',
        encoding: 'base32',
        token:otp,
        window:1
    })
}