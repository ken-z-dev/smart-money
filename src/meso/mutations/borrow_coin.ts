// Transaction info
// Function: 0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7::meso::borrow_coin

// Type args
// [
//   "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT"
// ]

// Args
// [
//   "10368180994"
// ]

import { type Account } from '@aptos-labs/ts-sdk';
import { signAndSubmitTransaction } from '../../utils/transaction';
import { generateMoveFunction } from '../utils';

const MAX_U64 = '18446744073709551615';

/**
 * Executes a borrow coin transaction.
 * @param {string} coinType - The Move coin type to borrow.
 * @param {Account} account - The account executing the transaction.
 */
export async function borrowCoin(coinType: string, account: Account) {
  await signAndSubmitTransaction(
    {
      function: generateMoveFunction({ method: 'borrow_coin' }),
      typeArguments: [coinType],
      functionArguments: [MAX_U64],
    },
    account,
  );
}
