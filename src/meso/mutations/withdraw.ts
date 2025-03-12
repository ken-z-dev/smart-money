// Transaction info
// Function: 0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7::meso::withdraw

// Args
// [
//   "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
//   "5000000"
// ]

import { type Account } from '@aptos-labs/ts-sdk';
import { signAndSubmitTransaction } from '../../utils/transaction';
import { generateMoveFunction } from '../utils';

const MAX_U64 = '18446744073709551615';

/**
 * Executes a withdraw transaction for the specified fungible asset.
 * @param {string} fungibleAsset - The Move fungible asset address to withdraw.
 * @param {Account} account - The account initiating the transaction.
 */
export async function withdraw(fungibleAsset: string, account: Account) {
  await signAndSubmitTransaction(
    {
      function: generateMoveFunction({ method: 'withdraw' }),
      functionArguments: [fungibleAsset, MAX_U64],
    },
    account,
  );
}
