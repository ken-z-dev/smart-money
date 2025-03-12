/* eslint-disable import/first */
require('dotenv').config({
  path: `.env.${process.env.ENV || 'testnet'}`,
});

import 'dotenv/config';

// MESO contract address on Aptos Mainnet
export const MESO_ADDRESS_MAINNET =
  '0x68476f9d437e3f32fd262ba898b5e3ee0a23a1d586a6cf29a28add35f253f6f7';
export const MESO_MODULE_NAME = 'meso';

// MESO API endpoint
export const API_ENDPOINT_URL = 'https://api.meso.finance';

// Load MESO private key from environment variables
export const MESO_APTOS_PRIVATE_KEY = process.env.MESO_APTOS_PRIVATE_KEY;

// Validate the private key existence
if (!MESO_APTOS_PRIVATE_KEY) {
  console.error('Environment variable MESO_APTOS_PRIVATE_KEY is missing.');
  process.exit(1); // Exit with failure status
}
