import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

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
  const reward = await getStackingReward(cityId, userId, cycle);

  // return result
  if (!reward) return new Response(`Reward not found: ${cityId} ${cycle} ${userId}`, { status: 404 });
  return new Response(JSON.stringify(reward));
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
