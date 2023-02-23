import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, Miner, NETWORK } from '../../../lib/api-helpers';

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
  const miner = await getMiner(cityId, height, userId);

  // return result
  if (!miner) return new Response(`Miner not found: ${cityId} ${height} ${userId}`, { status: 404 });
  return new Response(JSON.stringify(miner));
}

// returns the miner for a given city ID, block height, and user ID
async function getMiner(cityId: string, height: string, userId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining',
        functionName: 'get-miner',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(height)), uintCV(Number(userId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as Miner;
  } catch (err) {
    return null;
  }
}
