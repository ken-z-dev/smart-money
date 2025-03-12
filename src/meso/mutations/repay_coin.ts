// Transaction info
// Function: 0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7::meso::repay_coin

// Type args
// [
//   "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T"
// ]

// Args
// [
//   "4650007"
// ]

import { type Account } from '@aptos-labs/ts-sdk';
import { signAndSubmitTransaction } from '../../utils/transaction';
import { generateMoveFunction } from '../utils';

/**
 * Executes a repay coin transaction.
 * 
 * @param {string} coinType - The fully qualified Move type of the coin to repay.
 * @param {number} amount - The amount of the coin to repay (must be a positive number).
 * @param {Account} account - The Aptos account executing the transaction.
 */
export async function repayCoin(coinType: string, balance: number, account: Account) {
  if (!Number.isFinite(balance) || balance <= 0) {
    throw new Error('Invalid balance. Expected a positive number.');
  }

  await signAndSubmitTransaction(
    {
      function: generateMoveFunction({ method: 'repay_coin' }),
      typeArguments: [coinType],
      functionArguments: [balance],
    },
    account,
  );
}