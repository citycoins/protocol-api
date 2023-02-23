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
  const coinbaseAmount = await getCoinbaseAmount(cityId, height);

  // return result
  if (!coinbaseAmount) return new Response(`Coinbase amount not found: ${cityId} ${height}`, { status: 404 });
  return new Response(JSON.stringify(coinbaseAmount));
}

// returns the coinbase amount for a given city ID and block height
async function getCoinbaseAmount(cityId: string, height: string): Promise<number | undefined> {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining',
        functionName: 'get-coinbase-amount',
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
