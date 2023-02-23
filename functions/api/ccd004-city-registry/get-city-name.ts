import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });

  // get result from contract
  const cityName = await getCityName(cityId);

  // return result
  if (!cityName) return new Response(`City name not found: ${cityId}`, { status: 404 });
  return new Response(JSON.stringify(cityName));
}

async function getCityName(cityId: string): Promise<string | undefined> {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd004-city-registry',
        functionName: 'get-city-name',
        functionArgs: [uintCV(Number(cityId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? String(result) : undefined;
  } catch (err) {
    return undefined;
  }
}
