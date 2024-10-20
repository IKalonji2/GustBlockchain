import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateJwt = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Authentication token is missing.' });
    }

    try {
        console.log("token :",token)
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        // req.user = decoded as JwtPayload ;
        jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err:any) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        })
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};