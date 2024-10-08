import venom, { Whatsapp } from 'venom-bot';

const createWhatsAppClient = async (): Promise<Whatsapp | null> => {
    try {
        const client = await venom.create({
            session: 'otp-session',
        });
        console.log('WhatsApp session started!');
        return client;
    } catch (error) {
        console.error('Failed to create WhatsApp client:', error);
        return null;
    }
};

export const sendOtpWhatsApp = async (phoneNumber: string, otp: string) => {
    const client = await createWhatsAppClient();
    if (!client) {
        console.error('No client available to send OTP.');
        return;
    }

    try {
        await client.sendText(phoneNumber, `Your OTP code is: ${otp}`);
        console.log('OTP sent successfully!');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};