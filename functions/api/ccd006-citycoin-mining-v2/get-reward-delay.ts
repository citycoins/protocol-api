import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const rewardDelay = await getRewardDelay();

  // return result
  if (!rewardDelay) return createResponse(`Reward delay not found`, 404);
  return createResponse(rewardDelay);
}

// returns the reward delay
async function getRewardDelay() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining-v2',
        functionName: 'get-reward-delay',
        functionArgs: [],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return null;
  }
}
