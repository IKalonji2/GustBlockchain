import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateJwt = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Authentication token is missing.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};