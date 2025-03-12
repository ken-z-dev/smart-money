import { Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { MESO_APTOS_PRIVATE_KEY } from './constants';
import { client } from '../networks';

export async function getPrivateKey() {
  const privateKey = new Ed25519PrivateKey(MESO_APTOS_PRIVATE_KEY);

  const account = await client.deriveAccountFromPrivateKey({ privateKey });
  return account;
}
