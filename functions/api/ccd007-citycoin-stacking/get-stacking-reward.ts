import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);
  const cycle = requestUrl.searchParams.get('cycle');
  if (!cycle) return createResponse('Missing cycle parameter', 400);
  const userId = requestUrl.searchParams.get('userId');
  if (!userId) return createResponse('Missing userId parameter', 400);

  // get result from contract
  const reward = await getStackingReward(cityId, userId, cycle);

  // return result
  if (!reward) return createResponse(`Reward not found: ${cityId} ${cycle} ${userId}`, 404);
  return createResponse(reward);
}

async function getStackingReward(cityId: string, userId: string, cycle: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'get-stacking-reward',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(userId)), uintCV(Number(cycle))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return null;
  }
}
