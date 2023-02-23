import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { stringAsciiCV, uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, GetCityInfo, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);
  const treasuryName = requestUrl.searchParams.get('treasuryName');
  if (!treasuryName) return createResponse('Missing treasuryName parameter', 400);

  // get result from contract
  const cityInfo = await getCityInfo(cityId, treasuryName);

  // return result
  if (!cityInfo) return createResponse(`City info not found: ${cityId} ${treasuryName}`, 404);
  return createResponse(cityInfo);
}

// returns the city info for a given city ID and treasury name
async function getCityInfo(cityId: string, treasuryName: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-city-info',
        functionArgs: [uintCV(Number(cityId)), stringAsciiCV(treasuryName)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as GetCityInfo;
  } catch (err) {
    return null;
  }
}
