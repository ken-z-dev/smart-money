// https://github.com/sushi-labs/sushiswap/blob/058002cd3997830a1b4dfce0f6344fb6997a87b7/apps/web/src/app/(networks)/(non-evm)/aptos/_common/lib/types/token.ts
// The 'Token' type defines the structure for a token or coin used in the pool.
export type Token = {
  address: string; // The blockchain address of the token contract.
  decimals: number; // Number of decimal places for the token.
  logoURI?: string | null;
  name: string; // The full name of the token (e.g., USD Coin).
  symbol: string; // The symbol representing the token (e.g., USDC).
  // price: number; // Current price of the token.
  // wrapAddress: string; // Wrapped token address (if applicable).
  // type: string; // The type of token (e.g., FUNGIBLE_ASSET, COIN).
};

// The 'PoolAsset' type defines the structure for an asset within a lending or borrowing pool.
export type PoolAsset = {
  baseBps: number; // Base points (bps), usually for defining percentages.
  borrowApy: number; // Annual percentage yield for borrowing this asset.
  borrowFeeBps: number; // Additional fee charged for borrowing, in basis points.
  borrowRewardsPool: string; // Address of the rewards pool for borrowers.
  closeFactorBps: number; // Percentage of the debt that can be liquidated if collateral is insufficient.
  createdAt: string; // Date when the asset was created in ISO 8601 format.
  emodeBps: number; // E-mode (efficiency mode) basis points for this asset.
  emodeId: string; // Identifier for the asset in e-mode.
  fungibleAsset: string; // Blockchain address of the fungible asset (token or coin).
  isPaused: boolean; // Whether the asset's supply/borrow functionality is paused.
  lastUpdatedTimestamp: number; // Timestamp of the last update to this pool asset.
  liquidationFeeBps: number; // Fee for liquidating a position if a borrower defaults.
  maxBps: number; // Maximum basis points for calculations like collateral or borrowing limits.
  normaBps: number; // Standard or normal basis points for utilization or collateral.
  optimalBps: number; // Optimal basis points for the pool's utilization/collateral rate.
  optimalUtilizationBps: number; // Optimal utilization of the asset in the pool, in basis points.
  poolAddress: string; // Blockchain address of the pool that holds this asset.
  poolSupply: number; // Total amount of the asset supplied in the pool.
  protocolInterestFeeBps: number; // Interest fee collected by the protocol, in basis points.
  protocolLiquidationFeeBps: number; // Liquidation fee collected by the protocol, in basis points.
  supplyApy: number; // Annual percentage yield for supplying this asset.
  supplyCap: number; // Maximum amount of this asset that can be supplied to the pool.
  supplyRewardsPool: string; // Address of the rewards pool for suppliers.
  token: Token; // Details about the token associated with this pool asset.
  tokenAddress: string; // Blockchain address of the token used in the pool.
  totalDebt: number; // Total amount of this asset currently borrowed from the pool.
  totalDebtShares: number; // Shares of the debt in the pool.
  totalFees: number; // Total fees collected by the pool for this asset.
  totalReserves: number; // Total amount of the asset held in reserve by the protocol.
  totalSupplyShares: number; // Total shares of the supply in the pool.
  updatedAt: string; // Date when this pool asset was last updated, in ISO 8601 format.
  _id: string; // Unique identifier for the pool asset.
  walletBalance: number; // The user's balance of this asset in their wallet.
  amountDeposit: number; // The amount the user has deposited into the pool.
  debtAmount: number; // The amount the user has borrowed from the pool.
  incentiveSupplyApy: number; // Incentive yield for supplying this asset (extra rewards).
  incentiveBorrowApy: number; // Incentive yield for borrowing this asset (extra rewards).
  borrowCap: number; // Maximum amount that can be borrowed from the pool.
  emodeLiquidationThresholdBps: number; // Liquidation threshold in e-mode, in basis points.
  liquidationThresholdBps: number; // Standard liquidation threshold in basis points.
  totalBorrowAvailable: number; // Total amount of the asset available for borrowing.
  stakingApr: number; // Annual percentage return for staking this asset, if applicable.
};
