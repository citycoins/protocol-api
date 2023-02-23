import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);

  // get result from contract
  const treasuryNonce = await getTreasuryNonce(cityId);

  // return result
  if (!treasuryNonce) return createResponse(`Treasury nonce not found: ${cityId}`, 404);
  return createResponse(treasuryNonce);
}

async function getTreasuryNonce(cityId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-treasury-nonce',
        functionArgs: [uintCV(Number(cityId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    result === 0 ? null : Number(result);
  } catch (err) {
    return null;
  }
}
