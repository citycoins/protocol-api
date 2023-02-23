import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);
  const height = requestUrl.searchParams.get('height');
  if (!height) return createResponse('Missing height parameter', 400);
  const userId = requestUrl.searchParams.get('userId');
  if (!userId) return createResponse('Missing userId parameter', 400);

  // get result from contract
  const hasMined = await hasMinedAtBlock(cityId, height, userId);

  // return result
<<<<<<< HEAD
  if (hasMined === null) return new Response(`Miner not found: ${cityId} ${height} ${userId}`, { status: 404 });
  return new Response(JSON.stringify(hasMined));
=======
  if (hasMined === undefined) return createResponse(`Miner not found: ${cityId} ${height} ${userId}`, 404);
  return createResponse(hasMined);
>>>>>>> 49f6024 (fix: use createResponse helper to generate resopnses)
}

// returns true if the given user mined at the given block height
async function hasMinedAtBlock(cityId: string, height: string, userId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining',
        functionName: 'has-mined-at-block',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(height)), uintCV(Number(userId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return null;
  }
}
