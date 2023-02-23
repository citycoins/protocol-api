import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const rewardCycle = await getCurrentRewardCycle();

  // return result
  if (!rewardCycle) return new Response(`Reward cycle not found`, { status: 404 });
  return new Response(JSON.stringify(rewardCycle));
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
    return undefined;
  }
}
