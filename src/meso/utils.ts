import { type MoveStructId } from '@aptos-labs/ts-sdk';

import { MESO_ADDRESS_MAINNET, MESO_MODULE_NAME } from './constants';

export type GenerateMoveFunctionParams = {
  address?: string;
  module?: string;
  method: string;
};

export function generateMoveFunction({
  address = MESO_ADDRESS_MAINNET,
  module = MESO_MODULE_NAME,
  method,
}: GenerateMoveFunctionParams): MoveStructId {
  return `${address}::${module}::${method}`;
}
