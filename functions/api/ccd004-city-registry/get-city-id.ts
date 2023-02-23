import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { stringAsciiCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityName = requestUrl.searchParams.get('cityName');
  if (!cityName) return createResponse('Missing cityName parameter', 400);

  // get result from contract
  const cityId = await getCityId(cityName);

  // return result
  if (!cityId) return createResponse(`City ID not found: ${cityName}`, 404);
  return createResponse(cityId);
}

async function getCityId(cityName: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd004-city-registry',
        functionName: 'get-city-id',
        functionArgs: [stringAsciiCV(cityName)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? Number(result) : null;
  } catch (err) {
    return null;
  }
}
