// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/mutations/deposit.demo.ts

import { APTOS_NETWORK } from '../../networks';
import { getPrivateKey } from '../account';
import { USDT } from '../config/coins';
import { type SupportedNetwork } from '../config/chains';
import { getFaBalance } from '../../balance';
import { deposit } from './deposit';

/**
 * Main function to fetch account balance and deposit coins.
 */
async function main() {
  try {
    console.log('Initializing account...');
    const account = await getPrivateKey();

    console.log(`Fetching coin configuration for network: ${APTOS_NETWORK}...`);
    const coinConfig = USDT[APTOS_NETWORK as SupportedNetwork];
    if (!coinConfig) {
      throw new Error(`Unsupported network configuration: ${APTOS_NETWORK}`);
    }

    console.log(`Retrieving balance for address: ${account.accountAddress}...`);
    const balance = await getFaBalance(account.accountAddress, coinConfig.address);

    if (balance === 0) {
      console.log('Balance is 0. No deposit will be made.');
      return;
    }

    console.log(`Balance retrieved: ${balance}. Initiating deposit...`);
    await deposit(coinConfig.address, balance, account);

    console.log('Deposit transaction submitted successfully.');
  } catch (error) {
    console.error('An error occurred during the deposit process:', error.message);
  }
}

main();
