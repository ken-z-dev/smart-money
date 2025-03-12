// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/mutations/deposit_coin.demo.ts

// https://aptos.dev/en/build/smart-contracts/error-codes#insufficient_balance_for_transaction_fee
// INSUFFICIENT_BALANCE_FOR_TRANSACTION_FEE
// The default is often 200000 gas units which would end up requiring 0.20000000 APT. If you are having issues with this, please reach out to your wallet provider.

import { APTOS_NETWORK } from '../../networks';
import { getPrivateKey } from '../account';
import { WH_USDC } from '../config/coins';
import { type SupportedNetwork } from '../config/chains';
import { getBalanceCoin } from '../../balance';
import { depositCoin } from './deposit_coin';

/**
 * Main function to fetch account balance and deposit coins.
 */
async function main() {
  try {
    console.log('Initializing account...');
    const account = await getPrivateKey();

    console.log(`Fetching coin configuration for network: ${APTOS_NETWORK}...`);
    const coinConfig = WH_USDC[APTOS_NETWORK as SupportedNetwork];
    if (!coinConfig) {
      throw new Error(`Unsupported network configuration: ${APTOS_NETWORK}`);
    }

    console.log(`Retrieving balance for address: ${account.accountAddress}...`);
    const balance = await getBalanceCoin(account.accountAddress, coinConfig.address);

    if (balance === 0) {
      console.log('Balance is 0. No deposit will be made.');
      return;
    }

    console.log(`Balance retrieved: ${balance}. Initiating deposit...`);
    await depositCoin(coinConfig.address, balance, account);

    console.log('Deposit transaction submitted successfully.');
  } catch (error) {
    console.error('An error occurred during the deposit process:', error.message);
  }
}

main();
