import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const height = requestUrl.searchParams.get('height');
  if (!height) return new Response('Missing height parameter', { status: 400 });

  // get result from contract
  const highValue = await getHighValue(cityId, height);

  // return result
  if (!highValue) return new Response(`High value not found: ${cityId} ${height}`, { status: 404 });
  return new Response(JSON.stringify(highValue));
}

// returns the high value for a given city ID and block height
async function getHighValue(cityId: string, height: string): Promise<number | undefined> {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining',
        functionName: 'get-high-value',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(height))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return undefined;
  }
}
