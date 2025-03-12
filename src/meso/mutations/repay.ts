// Transaction info
// Function: 0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7::meso::repay

// Args
// [
//   "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
//   "4647484"
// ]

import { type Account } from '@aptos-labs/ts-sdk';
import { signAndSubmitTransaction } from '../../utils/transaction';
import { generateMoveFunction } from '../utils';

/**
 * Executes a deposit fungible asset  transaction.
 * 
 * @param {string} fungibleAsset - The Move fungible asset
 * @param {number} balance - The amount of the fungible asset to deposit (must be a positive number).
 * @param {Account} account - The Aptos account executing the transaction.
 */
export async function repay(fungibleAsset: string, balance: number, account: Account) {
  if (!Number.isFinite(balance) || balance <= 0) {
    throw new Error('Invalid balance. Expected a positive number.');
  }

  await signAndSubmitTransaction(
    {
      function: generateMoveFunction({ method: 'repay' }),
      functionArguments: [fungibleAsset, balance],
    },
    account,
  );
}
