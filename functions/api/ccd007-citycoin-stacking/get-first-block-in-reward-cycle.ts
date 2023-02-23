import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cycle = requestUrl.searchParams.get('cycle');
  if (!cycle) return createResponse('Missing cycle parameter', 400);

  // get result from contract
  const firstBlockInRewardCycle = await getFirstBlockInRewardCycle(cycle);

  // return result
  if (!firstBlockInRewardCycle) return createResponse(`Reward cycle not found: ${cycle}`, 404);
  return createResponse(firstBlockInRewardCycle);
}

// returns the first block in a given reward cycle
async function getFirstBlockInRewardCycle(cycle: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'get-first-block-in-reward-cycle',
        functionArgs: [uintCV(Number(cycle))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return null;
  }
}
