import { OTPModel } from "../model/otp_model";

const otpModel = new OTPModel();
export async function storeOtp(phone_number: string, otp: string) {
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpModel.createOTP(phone_number, otp, expiresAt);
}