import { Network } from '@aptos-labs/ts-sdk';

export const SUPPORTED_NETWORKS = [Network.MAINNET] as const;

export type SupportedNetwork = (typeof SUPPORTED_NETWORKS)[number];
