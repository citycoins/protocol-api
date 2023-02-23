import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const height = requestUrl.searchParams.get('height');
  if (!height) return new Response('Missing height parameter', { status: 400 });
  const userId = requestUrl.searchParams.get('userId');
  if (!userId) return new Response('Missing userId parameter', { status: 400 });

  // get result from contract
  const hasMined = await hasMinedAtBlock(cityId, height, userId);

  // return result
  if (hasMined === undefined) return new Response(`Miner not found: ${cityId} ${height} ${userId}`, { status: 404 });
  return new Response(JSON.stringify(hasMined));
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
    return undefined;
  }
}
