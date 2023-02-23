import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const proposal = requestUrl.searchParams.get('proposal');
  if (!proposal) return new Response('Missing proposal parameter', { status: 400 });
  const who = requestUrl.searchParams.get('who');
  if (!who) return new Response('Missing who parameter', { status: 400 });

  // get result from contract
  const signalled = await hasSignalled(proposal, who);

  // return result
  if (signalled === null) return new Response(`Proposal not found: ${proposal}`, { status: 404 });
  return new Response(JSON.stringify(signalled));
}

// returns if a given principal has signalled for a proposal
async function hasSignalled(proposal: string, who: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd001-direct-execute',
        functionName: 'has-signalled',
        functionArgs: [principalCV(proposal), principalCV(who)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return null;
  }
}
