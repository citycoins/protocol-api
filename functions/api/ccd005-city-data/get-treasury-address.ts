import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);
  const treasuryId = requestUrl.searchParams.get('treasuryId');
  if (!treasuryId) return createResponse('Missing treasuryId parameter', 400);

  // get result from contract
  const treasuryAddress = await getTreasuryAddress(cityId, treasuryId);

  // return result
  if (!treasuryAddress) return createResponse(`Treasury address not found: ${cityId} ${treasuryId}`, 404);
  return createResponse(treasuryId);
}

// returns the treasury address for a given city ID and treasury ID
async function getTreasuryAddress(cityId: string, treasuryId: string) {
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
    return result ? Number(result) : null;
  } catch (err) {
    return null;
  }
}
