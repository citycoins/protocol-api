import { StacksMainnet, StacksTestnet } from 'micro-stacks/network';

// General

// TODO: there has to be a better way to do this
type ResponseType =
  | string
  | number
  | boolean
  | GetCityInfo
  | ActivationDetails
  | GetCoinbaseInfo
  | CoinbaseThresholds
  | CoinbaseAmounts
  | CoinbaseDetails
  | MiningStats
  | Miner
  | BlockWinner
  | StackingStats
  | Stacker;

export const createResponse = (data: ResponseType, status = 200): Response => {
  return new Response(typeof data === 'string' ? data : JSON.stringify(data), { status: status });
};

// Stacks

export const NETWORK = (network: string) => {
  switch (network) {
    case 'mainnet':
      return new StacksMainnet();
    case 'testnet':
      return new StacksTestnet();
    default:
      return new StacksTestnet();
  }
};

export const DEPLOYER = (network: string) => {
  switch (network) {
    case 'mainnet':
      return 'SP8A9HZ3PKST0S42VM9523Z9NV42SZ026V4K39WH';
    case 'testnet':
      return 'ST8A9HZ3PKST0S42VM9523Z9NV42SZ026VZRMY61';
    default:
      return 'ST8A9HZ3PKST0S42VM9523Z9NV42SZ026VZRMY61';
  }
};

// CCD005 City Data

export interface GetCityInfo {
  activated: boolean; // activatedAt in contract
  details: ActivationDetails;
  treasury: string;
}

export interface ActivationDetails {
  succededAt: number;
  delay: number;
  activatedAt: number;
  threshold: number;
}

export interface GetCoinbaseInfo {
  thresholds: CoinbaseThresholds;
  amounts: CoinbaseAmounts;
  details: CoinbaseDetails;
}

export interface CoinbaseThresholds {
  cbt1: number;
  cbt2: number;
  cbt3: number;
  cbt4: number;
  cbt5: number;
}

export interface CoinbaseAmounts {
  cbaBonus: number;
  cba1: number;
  cba2: number;
  cba3: number;
  cba4: number;
  cba5: number;
  cbaDefault: number;
}

export interface CoinbaseDetails {
  bonus: number;
  epoch: number;
}

// CCD006 CityCoin Mining

export interface MiningStats {
  miners: number;
  amount: number;
  claimed: boolean;
}

export interface Miner {
  commit: number;
  low: number;
  high: number;
  winner: boolean;
}

export interface BlockWinner {
  winner: boolean;
  claimed: boolean;
}

// CCD007 CityCoin Stacking

export interface StackingStats {
  total: number;
  reward: number | undefined;
}

export interface Stacker {
  stacked: number;
  claimable: number;
}
