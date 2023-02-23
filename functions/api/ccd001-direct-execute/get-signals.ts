import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const proposal = requestUrl.searchParams.get('proposal');
  if (!proposal) return createResponse('Missing proposal parameter', 400);

  // get result from contract
  const signals = await getSignals(proposal);

  // return result
  if (!signals) return createResponse(`Proposal not found: ${proposal}`, 404);
  return createResponse(signals);
}

// returns the number of signals for a proposal
async function getSignals(proposal: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'base-dao',
        functionName: 'executed-at',
        functionArgs: [principalCV(proposal)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return null;
  }
}
