import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK, Stacker } from '../../../lib/api-helpers';

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
  const stacker = await getStacker(cityId, cycle, userId);

  // return result
  if (!stacker) return createResponse(`Stacker not found: ${cityId} ${cycle} ${userId}`, 404);
  return createResponse(stacker);
}

// returns the stacker for a given cityId, cycle, and userId
async function getStacker(cityId: string, cycle: string, userId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'get-stacker',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(cycle)), uintCV(Number(userId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as Stacker;
  } catch (err) {
    return null;
  }
}
