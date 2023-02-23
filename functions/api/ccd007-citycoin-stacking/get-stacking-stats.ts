import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK, StackingStats } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const cycle = requestUrl.searchParams.get('cycle');
  if (!cycle) return new Response('Missing cycle parameter', { status: 400 });

  // get result from contract
  const stackingStats = await getStackingStats(cityId, cycle);

  // return result
  if (!stackingStats) return new Response(`Stacking stats not found: ${cityId} ${cycle}`, { status: 404 });
  return new Response(JSON.stringify(stackingStats));
}

// returns the stacking stats for a given city and cycle
async function getStackingStats(cityId: string, cycle: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'get-stacking-stats',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(cycle))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as StackingStats;
  } catch (err) {
    return null;
  }
}
