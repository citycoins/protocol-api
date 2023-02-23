import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { stringAsciiCV, uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);
  const treasuryName = requestUrl.searchParams.get('treasuryName');
  if (!treasuryName) return createResponse('Missing treasuryName parameter', 400);

  // get result from contract
  const treasuryId = await getTreasuryId(cityId, treasuryName);

  // return result
  if (!treasuryId) return createResponse(`Treasury ID not found: ${cityId} ${treasuryName}`, 404);
  return createResponse(treasuryId);
}

async function getTreasuryId(cityId: string, treasuryName: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-treasury-id',
        functionArgs: [uintCV(Number(cityId)), stringAsciiCV(treasuryName)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? Number(result) : null;
  } catch (err) {
    return null;
  }
}
