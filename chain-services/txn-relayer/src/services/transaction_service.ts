import { Keyring } from '@polkadot/api';

export const sendTransaction = async (client:any, senderSeed:string, recipientAddress:string, amount:string) => {
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = keyring.addFromUri(senderSeed);

  const transfer = client.tx.balances.transfer(recipientAddress, amount);

  const hash = await transfer.signAndSend(sender);
  return hash;
};
