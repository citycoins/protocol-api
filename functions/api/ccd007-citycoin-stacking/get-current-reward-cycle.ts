import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const rewardCycle = await getCurrentRewardCycle();

  // return result
  if (!rewardCycle) return createResponse(`Reward cycle not found`, 404);
  return createResponse(rewardCycle);
}

// returns the current reward cycle
async function getCurrentRewardCycle() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'get-current-reward-cycle',
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
