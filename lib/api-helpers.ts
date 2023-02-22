import { StacksMainnet, StacksTestnet } from 'micro-stacks/network';

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
