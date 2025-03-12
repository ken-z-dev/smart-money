// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/unlooping_fa.ts

import { type Account, type MoveStructId } from '@aptos-labs/ts-sdk';
import { getBalanceCoin } from '../balance';
import { Token } from './types';
import { APTOS_NETWORK } from '../networks';
import { getPrivateKey } from './account';
import { SupportedNetwork } from './config/chains';
import { MAPPING_COIN, USDC, USDT } from './config/coins';
import { withdraw } from './mutations/withdraw';
import { repay } from './mutations/repay';
import { wait } from '../utils/time';

const prompts = require('prompts');

async function unlooping(coin: Token, account: Account) {
  await withdraw(coin.address, account);
  console.log(`Withdrawal successful for ${coin.symbol}`);
  await wait(1 * 2000);
  const balance = await getBalanceCoin(
    account.accountAddress,
    coin.address as MoveStructId,
  );
  console.log(`Current balance after withdrawal: ${balance}`);
  await repay(coin.address, balance, account);
  console.log(`Repayment successful for ${coin.symbol}`);
}

const n = 1;

export async function processUnloopingFa(symbolCoin: string) {
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
    message: `Do you want to ${coinConfig.symbol} unloop n = ${n} in ${account.accountAddress.toString()} on ${APTOS_NETWORK}?`,
    initial: true,
  });

  if (!response.confirm) {
    console.log('Unlooping operation aborted by the user.');
    return false;
  }

  try {
    for (let i = 0; i < n; i += 1) {
      console.log(`Starting unlooping iteration ${i + 1}...`);
      await unlooping(coinConfig, account);
    }
  } catch (error) {
    console.error('Error occurred while looping:', error);
    return false;
  }

  return true;
}
