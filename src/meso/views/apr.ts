import { formatNumberWithDecimals } from '../../utils/numbers';
import { API_ENDPOINT_URL } from '../constants';
import { PoolAsset } from '../types';

export const getPools = async (): Promise<{ data: PoolAsset[] }> => {
  const url = `${API_ENDPOINT_URL}/api/v1/pool`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching pools:', error);
    throw error;
  }
};

export const calculateNetIncentiveAprDiffence = (pool: PoolAsset): string => {
  const depositApr = pool.supplyApy;
  const depositAptIncentiveApr = pool.incentiveSupplyApy;
  const totalDepositApr = depositApr + depositAptIncentiveApr;

  const borrowApr = pool.borrowApy;
  const borrowAptIncentiveApr = pool.incentiveBorrowApy;
  const totalBorrowApr = borrowApr + borrowAptIncentiveApr;

  // const netAprDifference = (depositApr - borrowApr) * 100;
  const netIncentiveAprDifference = (totalDepositApr - totalBorrowApr) * 100;

  return formatNumberWithDecimals(netIncentiveAprDifference, 2);
};

export const processGettingApr = async (
  whitelistToken = [
    // 'zUSDC',
    // 'zUSDT',
    // 'wUSDC',
    'USDt',
    'USDC',
    // 'WBTC',
    // 'zWETH',
    // 'Cake',
  ],
): Promise<string[][]> => {
  let { data: pools } = await getPools();

  return pools
    .filter((pool) => whitelistToken.indexOf(pool.token.symbol) !== -1)
    .map((pool) => [pool.token.symbol, calculateNetIncentiveAprDiffence(pool)]);
};
