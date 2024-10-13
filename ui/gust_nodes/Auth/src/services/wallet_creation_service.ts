import { mnemonicGenerate, mnemonicToMiniSecret, cryptoWaitReady } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { encryptPrivateKey } from './encrytPk';

export function createMnemonic() {
  return mnemonicGenerate();
}

// export async function createPrivateKey() {
//   await cryptoWaitReady();
  
//   const mnemonic = createMnemonic();
//   console.log('Mnemonic:', mnemonic);

//   const miniSecret = mnemonicToMiniSecret(mnemonic);
//   const encryptedPrivateKey = encryptPrivateKey(miniSecret);
//   console.log('Private Key:', encryptedPrivateKey);
// }

export async function createWallet() {
  await cryptoWaitReady();

  const keyring = new Keyring({ type: 'sr25519' });
  const mnemonic = createMnemonic();
  const pair = keyring.addFromUri(mnemonic);
  console.log('Wallet Address:', pair.address);

  return pair;
}

// localStorage.setItem('mnemonic', mnemonic); // Store mnemonic securely