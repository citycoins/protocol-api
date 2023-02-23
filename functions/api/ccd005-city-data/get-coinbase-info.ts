import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, GetCoinbaseInfo, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);

  // get result from contract
  const coinbaseInfo = await getCoinbaseInfo(cityId);

  // return result
  if (!coinbaseInfo) return createResponse(`Coinbase info not found: ${cityId}`, 404);
  return createResponse(coinbaseInfo);
}

// returns the coinbase info for a given city ID
async function getCoinbaseInfo(cityId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-coinbase-info',
        functionArgs: [uintCV(Number(cityId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as GetCoinbaseInfo;
  } catch (err) {
    return null;
  }
}
