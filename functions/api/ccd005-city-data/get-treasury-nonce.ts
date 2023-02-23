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
  const treasuryNonce = await getTreasuryNonce(cityId);

  // return result
  if (!treasuryNonce) return new Response(`Treasury nonce not found: ${cityId}`, { status: 404 });
  return new Response(JSON.stringify(treasuryNonce));
}

async function getTreasuryNonce(cityId: string): Promise<number | undefined> {
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
    result === 0 ? undefined : Number(result);
  } catch (err) {
    return undefined;
  }
}
