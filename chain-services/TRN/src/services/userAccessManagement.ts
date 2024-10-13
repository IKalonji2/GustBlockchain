import { Request, Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req:Request, res:Response, next:NextFunction): void => {
    const token = req.cookies.token;
    
    if (!token) {
        res.status(401).send('Unauthorized');
    }
    
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) {
            res.sendStatus(403);
        }
        req.body.user = decoded;
        next();
    });
  };
  export const relayTransaction = (req: Request, res: Response) => {
    // The token has been verified, and you can access the authenticated user
    const user = req.body.user;
  
    // Handle the transaction relay process here
    res.json({ message: 'Transaction relayed successfully', user });
  };