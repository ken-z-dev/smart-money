// cd ~/workspace/mm-scripts/move/ts_scripts
// ENV=mainnet npx ts-node src/meso/mutations/withdraw_coin.demo.ts

import { APTOS_NETWORK } from '../../networks';
import { getPrivateKey } from '../account';
import { WH_USDC } from '../config/coins';
import { type SupportedNetwork } from '../config/chains';
import { withdrawCoin } from './withdraw_coin';

async function main() {
  try {
    const account = await getPrivateKey();
    const coinConfig = WH_USDC[APTOS_NETWORK as SupportedNetwork];

    if (!coinConfig) {
      throw new Error(`Unsupported network: ${APTOS_NETWORK}`);
    }

    await withdrawCoin(coinConfig.address, account);

    console.log('Transaction submitted successfully.');
  } catch (error) {
    console.error('Error occurred while borrowing coin:', error);
  }
}

main();
