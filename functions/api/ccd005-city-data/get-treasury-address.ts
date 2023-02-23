import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const treasuryId = requestUrl.searchParams.get('treasuryId');
  if (!treasuryId) return new Response('Missing treasuryId parameter', { status: 400 });

  // get result from contract
  const treasuryAddress = await getTreasuryAddress(cityId, treasuryId);

  // return result
  if (!treasuryAddress) return new Response(`Treasury address not found: ${cityId} ${treasuryId}`, { status: 404 });
  return new Response(JSON.stringify(treasuryId));
}

// returns the treasury address for a given city ID and treasury ID
async function getTreasuryAddress(cityId: string, treasuryId: string): Promise<string | undefined> {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-treasury-address',
        functionArgs: [uintCV(Number(cityId)), uintCV(treasuryId)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? String(result) : undefined;
  } catch (err) {
    return undefined;
  }
}
