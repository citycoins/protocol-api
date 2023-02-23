import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const rewardCycleLength = await getRewardCycleLength();

  // return result
  if (!rewardCycleLength) return createResponse(`Reward cycle length not found`, 404);
  return createResponse(rewardCycleLength);
}

// returns the reward cycle length
async function getRewardCycleLength() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'get-reward-cycle-length',
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
