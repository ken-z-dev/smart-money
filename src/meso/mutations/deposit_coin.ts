// Transaction info
// Function: 0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7::meso::deposit_coin

// Type args
// [
//   "0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T"
// ]

// Args
// [
//   "70879473"
// ]

// https://aptos.dev/en/build/smart-contracts/error-codes#insufficient_balance_for_transaction_fee
// INSUFFICIENT_BALANCE_FOR_TRANSACTION_FEE
// The default is often 200000 gas units which would end up requiring 0.20000000 APT. If you are having issues with this, please reach out to your wallet provider.

import { type Account } from '@aptos-labs/ts-sdk';
import { signAndSubmitTransaction } from '../../utils/transaction';
import { generateMoveFunction } from '../utils';

/**
 * Executes a deposit coin transaction.
 * 
 * @param {string} coinType - The fully qualified Move type of the coin to deposit.
 * @param {number} balance - The amount of the coin to deposit (must be a positive number).
 * @param {Account} account - The Aptos account executing the transaction.
 */
export async function depositCoin(coinType: string, balance: number, account: Account) {
  if (!Number.isFinite(balance) || balance <= 0) {
    throw new Error('Invalid balance. Expected a positive number.');
  }

  await signAndSubmitTransaction(
    {
      function: generateMoveFunction({ method: 'deposit_coin' }),
      typeArguments: [coinType],
      functionArguments: [balance],
    },
    account,
  );
}
