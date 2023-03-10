import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const burnHeight = requestUrl.searchParams.get('burnHeight');
  if (!burnHeight) return createResponse('Missing burnHeight parameter', 400);

  // get result from contract
  const rewardCycle = await getRewardCycle(burnHeight);

  // return result
  if (!rewardCycle) return createResponse(`Reward cycle not found: ${burnHeight}`, 404);
  return createResponse(rewardCycle);
}

// returns the reward cycle for a given burn height
async function getRewardCycle(burnHeight: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'get-reward-cycle',
        functionArgs: [uintCV(Number(burnHeight))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return null;
  }
}
