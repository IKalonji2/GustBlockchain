import {Request, Response} from 'express';
import { createSmoldotClient } from '../services/smoldot_service';
import { sendTransaction } from '../services/transaction_service';

export const signingAndSending = async (req:Request, res:Response) => {
    const { chainSpec, recipientAddress, amount } = req.body;

  try {
    const client = await createSmoldotClient(chainSpec);

    const txHash = await sendTransaction(client, recipientAddress, amount);

    res.json({ message: 'Transaction relayed successfully', txHash });
  } catch (error) {
    console.error('Error relaying transaction:', error);
    res.status(500).json({ message: 'Transaction failed', error });
  }
}