import { Network } from '@aptos-labs/ts-sdk';
import { type Token } from '../types';
import { SupportedNetwork } from './chains';

// https://github.com/sushi-labs/sushiswap/blob/058002cd3997830a1b4dfce0f6344fb6997a87b7/apps/web/src/app/(networks)/(non-evm)/aptos/_common/config/coins.ts
export const WH_USDC = {
  [Network.MAINNET]: {
    address:
      '0x5e156f1207d0ebfa19a9eeff00d62a282278fb8719f4fab3a586a0a2c0fffbea::coin::T',
    decimals: 6,
    symbol: 'whUSDC',
    name: 'Wormhole - USD Coin',
  },
} as const satisfies Partial<Record<SupportedNetwork, Token>>;

export const Z_USDT = {
  [Network.MAINNET]: {
    address:
      '0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT',
    decimals: 6,
    symbol: 'zUSDT',
    name: 'LayerZero • Tether USD',
  },
} as const satisfies Partial<Record<SupportedNetwork, Token>>;

export const USDT = {
  [Network.MAINNET]: {
    name: 'Tether',
    symbol: 'USDT',
    decimals: 6,
    address:
      '0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b',
  },
} as const satisfies Partial<Record<SupportedNetwork, Token>>;

export const USDC = {
  [Network.MAINNET]: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address:
      '0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b',
  },
} as const satisfies Partial<Record<SupportedNetwork, Token>>;

export const MAPPING_COIN = {
  zUSDT: Z_USDT,
  USDt: USDT,
  USDC: USDC, 
}; 
