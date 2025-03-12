import {
  Aptos,
  AptosConfig,
  Network,
  NetworkToNetworkName,
} from '@aptos-labs/ts-sdk';

// Determine the network from the environment variable, defaulting to TESTNET
export const APTOS_NETWORK: Network =
  NetworkToNetworkName[process.env.ENV ?? Network.TESTNET];

console.log(`Initializing Aptos client on network: ${APTOS_NETWORK}`);

// Configure the Aptos client
const config = new AptosConfig({ network: APTOS_NETWORK });
export const client = new Aptos(config);

/**
 * Check if the current environment is set to 'testnet'
 * @returns {boolean} True if the environment is 'testnet', otherwise false
 */
export function isTestnet(): boolean {
  return process.env.ENV?.toLowerCase() === 'testnet';
}
