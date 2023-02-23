import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK, Stacker } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const cycle = requestUrl.searchParams.get('cycle');
  if (!cycle) return new Response('Missing cycle parameter', { status: 400 });
  const userId = requestUrl.searchParams.get('userId');
  if (!userId) return new Response('Missing userId parameter', { status: 400 });

  // get result from contract
  const stacker = await getStacker(cityId, cycle, userId);

  // return result
  if (!stacker) return new Response(`Stacker not found: ${cityId} ${cycle} ${userId}`, { status: 404 });
  return new Response(JSON.stringify(stacker));
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
