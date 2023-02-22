import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const contractPrincipal = requestUrl.searchParams.get('proposal');
  if (!contractPrincipal) return new Response('Missing proposal parameter', { status: 400 });

  // get result from contract
  const executed = await executedAt(contractPrincipal);

  // return result
  if (!executed) return new Response(`Proposal not found: ${contractPrincipal}`, { status: 404 });
  return new Response(JSON.stringify(executed));
}

// returns the block height a proposal was executed at
async function executedAt(contractPrincipal: string): Promise<number | undefined> {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'base-dao',
        functionName: 'executed-at',
        functionArgs: [principalCV(contractPrincipal)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return undefined;
  }
}
