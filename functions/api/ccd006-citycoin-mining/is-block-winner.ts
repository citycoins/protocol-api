import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV, uintCV } from 'micro-stacks/clarity';
import { BlockWinner, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const user = requestUrl.searchParams.get('user');
  if (!user) return new Response('Missing user parameter', { status: 400 });
  const claimHeight = requestUrl.searchParams.get('claimHeight');
  if (!claimHeight) return new Response('Missing claimHeight parameter', { status: 400 });

  // get result from contract
  const winner = await isBlockWinner(cityId, user, claimHeight);

  // return result
  if (!winner) return new Response(`Block winner not found: ${cityId} ${user} ${claimHeight}`, { status: 404 });
  return new Response(JSON.stringify(winner));
}

// returns true if the given user mined at the given block height
async function isBlockWinner(cityId: string, user: string, claimHeight: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining',
        functionName: 'is-block-winner',
        functionArgs: [uintCV(Number(cityId)), principalCV(user), uintCV(Number(claimHeight))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as BlockWinner;
  } catch (err) {
    return null;
  }
}
