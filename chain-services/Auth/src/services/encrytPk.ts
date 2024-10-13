import crypto from 'crypto';
import dotenv from 'dotenv';


dotenv.config();

const secretKey = process.env.SECRET_KEY;  

const SALT = 'random_salt_value';

const deriveKey = (password:string, salt:string) => {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256'); 
};

export const encryptPrivateKey = (privateKey:any) => {
    const iv = crypto.randomBytes(16); 
    const key = deriveKey(secretKey as string, SALT);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(privateKey, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted,
    };
};

export const decryptPrivateKey = (encryptedData:any) => {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const ciphertext = encryptedData.encryptedData;

    const key = deriveKey(secretKey as string, SALT);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(ciphertext, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
};

// test usage
// const privateKey = 'your_private_key_here';
// const encrypted = encryptPrivateKey(privateKey);
// console.log('Encrypted:', encrypted);

// const decrypted = decryptPrivateKey(encrypted);
// console.log('Decrypted:', decrypted);
