import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const rewardDelay = await getRewardDelay();

  // return result
  if (!rewardDelay) return new Response(`Reward delay not found`, { status: 404 });
  return new Response(JSON.stringify(rewardDelay));
}

// returns the reward delay
async function getRewardDelay() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining',
        functionName: 'get-reward-delay',
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
