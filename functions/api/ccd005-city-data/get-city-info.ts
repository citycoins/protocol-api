import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { stringAsciiCV, uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const treasuryName = requestUrl.searchParams.get('treasuryName');
  if (!treasuryName) return new Response('Missing treasuryName parameter', { status: 400 });

  // get result from contract
  const cityInfo = await getCityInfo(cityId, treasuryName);

  // return result
  if (!cityInfo) return new Response(`City info not found: ${cityId} ${treasuryName}`, { status: 404 });
  return new Response(JSON.stringify(cityInfo));
}

// idea: match function name GetCityInfo
interface CityInfo {
  activated: boolean;
  details: ActivationDetails;
  treasury: string;
}

// idea: type for each map, include CCD005?
interface ActivationDetails {
  succededAt: number;
  delay: number;
  activatedAt: number;
  threshold: number;
}

// returns the city info for a given city ID and treasury name
async function getCityInfo(cityId: string, treasuryName: string): Promise<CityInfo | undefined> {
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
    return result as CityInfo;
  } catch (err) {
    return undefined;
  }
}
