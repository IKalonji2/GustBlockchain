import { Request, Response , NextFunction} from 'express';
import { Keyring } from '@polkadot/api';
import { connectToChain } from '../services/connectChain';
import { authenticateToken } from '../services/authenticateToken';

export const topUpWalletRelay = async (req: Request, res: Response, next:NextFunction): Promise<any> => {
    try {
        authenticateToken(req, res, next);

        const publicKey = localStorage.getItem('Wallet Address');
        if (!publicKey) {
            return res.status(400).json({ error: 'Public key not found' });
        }

        const api = await connectToChain();

        // const { walletAddress, amount } = req.body.amount;

        // if (!walletAddress || !amount) {
        //     return res.status(400).json({ error: 'Missing walletAddress or amount in request body' });
        // }

        //Relayer account
        const keyring = new Keyring({ type: 'sr25519' });
        const signer = keyring.addFromUri('//Alice');


        // const transfer = api.tx.balances.transfer(walletAddress, amount);
        const transfer = api.tx.balances.transfer(publicKey, req.body.amount);

        const unsub = await transfer.signAndSend(signer, ({ status, dispatchError }) => {
            if (status.isInBlock) {
                console.log(`Transaction included at blockHash ${status.asInBlock}`);
                res.json({ success: true, message: 'Wallet loaded successfully' });
            } else if (dispatchError) {
                if (dispatchError.isModule) {
                    const decoded = api.registry.findMetaError(dispatchError.asModule);
                    const { docs, name, section } = decoded;
                    res.status(400).json({ error: `${section}.${name}: ${docs.join(' ')}` });
                } else {
                    res.status(400).json({ error: dispatchError.toString() });
                }
            }
        });

    } catch (error) {
        console.error('Error loading wallet:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
