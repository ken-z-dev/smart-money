// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/unlooping_coin.ts

import { type Account , type MoveStructId } from '@aptos-labs/ts-sdk';
import { getBalanceCoin } from "../balance";
import { withdrawCoin } from "./mutations/withdraw_coin";
import { Token } from "./types";
import { repayCoin } from './mutations/repay_coin';
import { APTOS_NETWORK } from '../networks';
import { getPrivateKey } from './account';
import { SupportedNetwork } from './config/chains';
import { Z_USDT } from './config/coins';

async function unlooping(coin: Token, account: Account) {
  await withdrawCoin(coin.address, account);
  const balance = await getBalanceCoin(account.accountAddress, coin.address as MoveStructId);
  await repayCoin(coin.address, balance, account);
}

const n = 5;

async function main() {
  const account = await getPrivateKey();
  const coinConfig = Z_USDT[APTOS_NETWORK as SupportedNetwork];

  if (!coinConfig) {
    throw new Error(`Unsupported network: ${APTOS_NETWORK}`);
  }

  try {
    for (let i = 0; i < n; i += 1) {
      await unlooping(coinConfig, account);
      console.log(`i = ${i}`);
    }
  } catch (error) {
    console.error('Error occurred while looping:', error);
  }
}

main();


// public entry fun unloop_time_coin<T>(src: &signer, n: u64) {
//   let i = 0;
//   while (i < n) {
//     meso::withdraw_coin<T>(src, MAX_U64);
//     meso::repay_coin<T>(src, coin::balance<T>(signer::address_of(src)));
//     i = i + 1;
//   }
// }