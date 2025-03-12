// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/mutations/borrow.demo.ts

import { APTOS_NETWORK } from '../../networks';
import { getPrivateKey } from '../account';
import { USDC } from '../config/coins';
import { type SupportedNetwork } from '../config/chains';
import { borrow } from './borrow';

async function main() {
  try {
    const account = await getPrivateKey();
    const coinConfig = USDC[APTOS_NETWORK as SupportedNetwork];

    if (!coinConfig) {
      throw new Error(`Unsupported network: ${APTOS_NETWORK}`);
    }

    await borrow(coinConfig.address, account);

    console.log('Transaction submitted successfully.');
  } catch (error) {
    console.error('Error occurred while borrowing coin:', error);
  }
}

main();
