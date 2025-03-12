// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/looping_fa.ts

import { type Account, type MoveStructId } from '@aptos-labs/ts-sdk';
import { APTOS_NETWORK } from '../networks';
import { getPrivateKey } from './account';
import { SupportedNetwork } from './config/chains';
import { type Token } from './types';
import { getBalanceCoin } from '../balance';
import { borrow } from './mutations/borrow';
import { deposit } from './mutations/deposit';
import { MAPPING_COIN, USDC, USDT } from './config/coins';
import { wait } from '../utils/time';

const prompts = require('prompts');

async function looping(coin: Token, account: Account) {
  const beforeBalance = await getBalanceCoin(
    account.accountAddress,
    coin.address as MoveStructId,
  );
  await borrow(coin.address, account);
  await wait(3 * 1000);
  const afterBalance = await getBalanceCoin(
    account.accountAddress,
    coin.address as MoveStructId,
  );
  const netBalance = afterBalance - beforeBalance;
  await deposit(coin.address, netBalance, account);
  return netBalance;
}

const n = 1;

export async function processLoopingFa(symbolCoin: string) {
  const account = await getPrivateKey();
  const coinConfig = (
    MAPPING_COIN as Record<string, Record<SupportedNetwork, Token>>
  )[symbolCoin][APTOS_NETWORK as SupportedNetwork];

  if (!coinConfig) {
    throw new Error(`Unsupported network: ${APTOS_NETWORK}`);
  }

  const response = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Do you want to ${coinConfig.symbol} loop n = ${n} in ${account.accountAddress.toString()} on ${APTOS_NETWORK}?`,
    initial: true,
  });

  if (!response.confirm) {
    console.log('Looping operation aborted by the user.');
    return false;
  }

  try {
    for (let i = 0; i < n; i += 1) {
      console.log(`Starting looping iteration ${i + 1}...`);
      await looping(coinConfig, account);
    }
  } catch (error) {
    console.error('Error occurred while looping:', error);
    return false;
  }
  return true;
}
