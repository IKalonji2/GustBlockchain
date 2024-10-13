import jwt from 'jsonwebtoken';
import { Request, Response , NextFunction } from "express";
import dotenv from 'dotenv';

dotenv.config();

export function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET as string || 'the-fallback-secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
}