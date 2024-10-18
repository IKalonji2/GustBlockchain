import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createSmoldotClient } from './services/smoldot_service';
import { sendTransaction } from './services/transaction_service';
import { authenticateJwt } from './services/auth_service';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post('/relay-transaction', authenticateJwt, async (req, res) => {
  const { chainSpec, recipientAddress, amount } = req.body;

  try {
    const client = await createSmoldotClient(chainSpec);

    const txHash = await sendTransaction(client, recipientAddress, amount);

    res.json({ message: 'Transaction relayed successfully', txHash });
  } catch (error) {
    console.error('Error relaying transaction:', error);
    res.status(500).json({ message: 'Transaction failed', error });
  }
});

app.listen(3001, () => {
  console.log('Transaction relayer API running on port 3001');
});
