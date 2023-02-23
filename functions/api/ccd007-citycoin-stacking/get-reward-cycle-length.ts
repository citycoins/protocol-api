import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const rewardCycleLength = await getRewardCycleLength();

  // return result
  if (!rewardCycleLength) return new Response(`Reward cycle length not found`, { status: 404 });
  return new Response(JSON.stringify(rewardCycleLength));
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
    return undefined;
  }
}
