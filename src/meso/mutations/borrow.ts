// Transaction info
// Function: 0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7::meso::borrow

// Args
// [
//   "0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b",
//   "10364102981"
// ]

import { type Account } from '@aptos-labs/ts-sdk';
import { signAndSubmitTransaction } from '../../utils/transaction';
import { generateMoveFunction } from '../utils';

const MAX_U64 = '18446744073709551615';

/**
 * Executes a borrow_coin transaction for the specified fungible asset.
 * @param {string} fungibleAsset - The Move fungible asset to borrow.
 * @param {Account} account - The account to execute the transaction.
 */
export async function borrow(fungibleAsset: string, account: Account) {
  await signAndSubmitTransaction(
    {
      function: generateMoveFunction({ method: 'borrow' }),
      // functionArguments: [fungibleAsset, 1 *  10**6], // 1 USDC
      functionArguments: [fungibleAsset, MAX_U64],
    },
    account,
  );
}
