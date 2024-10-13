import { ApiPromise, WsProvider } from "@polkadot/api";

export async function connectToChain() {
    const wsProvider = new WsProvider('wss://your-blockchain-node-url');
    return await ApiPromise.create({ provider: wsProvider });
}
  