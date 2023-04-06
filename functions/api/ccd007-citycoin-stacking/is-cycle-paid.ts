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
  const tip = requestUrl.searchParams.get('tip');

  // get result from contract
  const paid = await isCyclePaid(cityId, cycle, tip ? tip : undefined);

  // return result
  if (paid === null) return createResponse(`Cycle payout information not found: ${cityId} ${cycle}`, 404);
  return createResponse(paid);
}

// returns true if the cycle is paid
async function isCyclePaid(cityId: string, cycle: string, tip?: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'is-cycle-paid',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(cycle))],
        network: NETWORK('mainnet'),
        tip: tip,
      },
      true
    );
    return typeof result === 'boolean' ? Boolean(result) : null;
  } catch (err) {
    return null;
  }
}
