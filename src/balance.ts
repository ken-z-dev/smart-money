import { type AccountAddress, type MoveStructId } from '@aptos-labs/ts-sdk';
import { client } from './networks';

/**
 * Prints the balance of an account
 * @param aptos
 * @param name
 * @param address
 * @returns {Promise<number>}
 *
 */
export const balance = async (
  accountAddress: AccountAddress,
  versionToWaitFor?: bigint,
): Promise<number> => {
  const amount = await client.getAccountAPTAmount({
    accountAddress,
    minimumLedgerVersion: versionToWaitFor,
  });
  return amount;
};

// https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/your_coin.ts
/** Returns the balance of the newly created coin for an account */
export const getBalanceCoin = async (
  accountAddress: AccountAddress,
  coinType: MoveStructId,
) =>
  client.getAccountCoinAmount({
    accountAddress,
    coinType,
  });

// https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/your_fungible_asset.ts
export const getFaBalance = async (
  accountAddress: AccountAddress,
  assetType: string,
): Promise<number> => {
  const data = await client.getCurrentFungibleAssetBalances({
    options: {
      where: {
        owner_address: { _eq: accountAddress.toStringLong() },
        asset_type: { _eq: assetType },
      },
    },
  });

  return data[0]?.amount ?? 0;
};

// Fund the account on chain. Funding an account creates it on-chain.
export const fundAccount = async (
  accountAddress: AccountAddress,
  amount: number,
) => {
  const response = await client.fundAccount({
    accountAddress,
    amount,
  });

  console.log(
    `Funded account ${accountAddress} with ${amount} APT at ${response}`,
  );
  return response;
};
