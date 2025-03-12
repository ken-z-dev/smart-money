// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/looping_coin.ts

import { type Account , type MoveStructId } from '@aptos-labs/ts-sdk';
import { APTOS_NETWORK } from "../networks";
import { getPrivateKey } from "./account";
import { SupportedNetwork } from "./config/chains";
import { WH_USDC } from "./config/coins";
import { type Token } from './types';
import { getBalanceCoin } from '../balance';
import { borrowCoin } from './mutations/borrow_coin';
import { depositCoin } from './mutations/deposit_coin';

async function looping(coin: Token, account: Account) {
  const beforeBalance = await getBalanceCoin(account.accountAddress, coin.address as MoveStructId);
  await borrowCoin(coin.address, account);
  const afterBalance = await getBalanceCoin(account.accountAddress, coin.address as MoveStructId);
  const netBalance = afterBalance - beforeBalance;
  await depositCoin(coin.address, netBalance, account);
  return netBalance;
}

const n = 3;

async function main() {
  const account = await getPrivateKey();
  const coinConfig = WH_USDC[APTOS_NETWORK as SupportedNetwork];

  if (!coinConfig) {
    throw new Error(`Unsupported network: ${APTOS_NETWORK}`);
  }

  try {
    for (let i = 0; i < n; i += 1) {
      await looping(coinConfig, account);
    }
  } catch (error) {
    console.error('Error occurred while looping:', error);
  }
}

main();

// public entry fun looping_coin<T>(src: &signer, n: u64) {
//   let i = 0;
//   while (i < n) {
//     let _a = looping_coin_once<T>(src);
//     i = i + 1;
//   }
// }

// public entry fun looping_coin_max<T>(src: &signer) {
//   let flag = true;
//   while (flag) {
//     let borrowable = looping_coin_once<T>(src);
//     if (borrowable < MIN_BORROWABLE) {
//       flag = false;
//     }
//   }
// }

// fun looping_coin_once<T>(src: &signer): u64 {
//   let before_balance = coin::balance<T>(signer::address_of(src));
//   meso::borrow_coin<T>(src, MAX_U64);
//   let after_balance = coin::balance<T>(signer::address_of(src));
//   let net_balance = after_balance - before_balance;
//   meso::deposit_coin<T>(src, net_balance);
//   (net_balance)
// }