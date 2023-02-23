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
  const treasuryName = await getTreasuryName(cityId, treasuryId);

  // return result
<<<<<<< HEAD
  if (!treasuryName) return new Response(`Treasury name not found: ${cityId} ${treasuryId}`, { status: 404 });
  return new Response(treasuryName);
=======
  if (!treasuryName) return createResponse(`Treasury name not found: ${cityId} ${treasuryId}`, 404);
  return createResponse('Not implemented, coming soon!', 501);
>>>>>>> 49f6024 (fix: use createResponse helper to generate resopnses)
}

async function getTreasuryName(cityId: string, treasuryId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-treasury-name',
        functionArgs: [uintCV(Number(cityId)), uintCV(treasuryId)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? String(result) : null;
  } catch (err) {
    return null;
  }
}
