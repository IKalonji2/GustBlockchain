import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from '@polkadot/keyring';
import dotenv from 'dotenv';
import { Request, Response , NextFunction } from "express";
import jwt from 'jsonwebtoken';


dotenv.config();

async function connectToChain() {
    const wsProvider = new WsProvider('wss://your-blockchain-node-url');
    return await ApiPromise.create({ provider: wsProvider });
  }
  
function authenticateToken(req:Request, res:Response, next:NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET as string || 'the-fallback-secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
}
  
async function deploySmartContract(api:any, signer:any, wasm:any, abi:any, endowment:any, gasLimit:any) {
    const tx = api.tx.contracts.instantiateWithCode(endowment, gasLimit, wasm, abi);
    return tx.signAndSend(signer);
}

async function deploySmartContractMock() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, contractAddress: 'mock-contract-address' });
      }, 2000); // Simulate a 2-second delay for deployment
    });
}
  
export const relayTransaction = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const authError = authenticateToken(req, res, next);
        if (authError) {
            res.status(403).json({ error: 'Unauthorized' });
        }

        const { wasm, abi, endowment, gasLimit } = req.body;

        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = req.user.exp - currentTime;

        if (timeLeft <= 0) {
            res.status(403).json({ error: 'JWT token has expired' });
        }

        const api = await connectToChain();
        const keyring = new Keyring({ type: 'sr25519' });
        const signer = keyring.addFromUri('//Alice');

        const deployPromise = deploySmartContractMock();

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Transaction timed out')), timeLeft * 1000)
        );

        const result = await Promise.race([deployPromise, timeoutPromise]);
        res.json({ success: true, result });

    } catch (error) {
        console.error(error); 
        if (!res.headersSent) {
            res.status(500).json({ error: error || 'Internal Server Error' });
        }
    }
};