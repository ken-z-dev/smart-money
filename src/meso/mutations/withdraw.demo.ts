// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/mutations/withdraw.demo.ts

import { APTOS_NETWORK } from '../../networks';
import { getPrivateKey } from '../account';
import { USDT } from '../config/coins';
import { type SupportedNetwork } from '../config/chains';
import { withdraw } from './withdraw';

async function main() {
  try {
    const account = await getPrivateKey();
    const coinConfig = USDT[APTOS_NETWORK as SupportedNetwork];

    if (!coinConfig) {
      throw new Error(`Unsupported network: ${APTOS_NETWORK}`);
    }

    await withdraw(coinConfig.address, account);

    console.log('Transaction submitted successfully.');
  } catch (error) {
    console.error('Error occurred during the withdrawal process:', error.message || error);
  }
}

main();
