// Transaction info
// Function: 0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7::meso::withdraw_coin

// Type args
// [
//   "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT"
// ]

// Args
// [
//   "18446744073709551615"
// ]

import { type Account } from '@aptos-labs/ts-sdk';
import { signAndSubmitTransaction } from '../../utils/transaction';
import { generateMoveFunction } from '../utils';

const MAX_U64 = '18446744073709551615';

/**
 * Executes a withdrawal transaction for the specified coin type.
 * @param {string} coinType - The Move coin type address to withdraw.
 * @param {Account} account - The account initiating the transaction.
 */
export async function withdrawCoin(coinType: string, account: Account) {
  await signAndSubmitTransaction(
    {
      function: generateMoveFunction({ method: 'withdraw_coin' }),
      typeArguments: [coinType],
      functionArguments: [MAX_U64],
    },
    account,
  );
}
