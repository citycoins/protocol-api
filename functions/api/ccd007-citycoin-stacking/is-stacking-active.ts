import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const cycle = requestUrl.searchParams.get('cycle');
  if (!cycle) return new Response('Missing cycle parameter', { status: 400 });

  // get result from contract
  const active = await isStackingActive(cityId, cycle);

  // return result
  if (active === null) return new Response(`Stacking status not found: ${cityId} ${cycle}`, { status: 404 });
  return new Response(JSON.stringify(active));
}

// returns true if the cycle is active
async function isStackingActive(cityId: string, cycle: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'is-stacking-active',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(cycle))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return null;
  }
}
