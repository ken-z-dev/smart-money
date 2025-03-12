import {
  type InputGenerateTransactionPayloadData,
  type Account,
} from '@aptos-labs/ts-sdk';
import { client } from '../networks';

/**
 * Signs and submits a transaction.
 *
 * @param payload - The transaction payload data.
 * @param account - The account used for signing the transaction.
 * @returns The transaction hash if successful.
 * @throws An error if the transaction simulation or submission fails.
 */
export async function signAndSubmitTransaction(
  payload: InputGenerateTransactionPayloadData,
  account: Account,
): Promise<string> {
  try {
    // Step 1: Build the transaction
    const transaction = await client.transaction.build.simple({
      sender: account.accountAddress,
      data: payload,
    });

    // Step 2: Simulate the transaction to estimate gas
    const [simulationResult] = await client.transaction.simulate.simple({
      signerPublicKey: account.publicKey,
      transaction,
      options: {
        estimateGasUnitPrice: true,
        estimateMaxGasAmount: true,
        estimatePrioritizedGasUnitPrice: true,
      },
    });

    if (!simulationResult) {
      throw new Error(
        'Transaction simulation failed. Please check your network or try again later.',
      );
    }

    // Step 3: Sign the transaction with estimated gas
    const senderAuthenticator = client.transaction.sign({
      signer: account,
      transaction,
      // Uncomment and customize gas parameters if needed
      // options: {
      //   maxGasAmount: Math.ceil(Number(simulationResult.gas_used) * 1.1),
      //   gasUnitPrice: Number(simulationResult.gas_unit_price),
      // },
    });

    // Step 4: Submit the transaction
    const pendingTransaction = await client.transaction.submit.simple({
      transaction,
      senderAuthenticator,
    });

    // Step 5: Wait for transaction confirmation
    const response = await client.waitForTransaction({
      transactionHash: pendingTransaction.hash,
    });

    if (response?.success) {
      console.log(`Transaction successful. Hash: ${pendingTransaction.hash}`);
      return pendingTransaction.hash;
    } else {
      throw new Error(
        `Transaction failed: ${response.vm_status}. Please review the transaction details and try again.`,
      );
    }
  } catch (error) {
    console.error('An error occurred during the transaction process:', error);
    throw error;
  }
}
