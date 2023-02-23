import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const proposal = requestUrl.searchParams.get('extension');
  if (!proposal) return createResponse('Missing extension parameter', 400);

  // get result from contract
  const extension = await isExtension(proposal);

  // return result
  if (extension === null) return createResponse(`Extension not found: ${proposal}`, 404);
  return createResponse(extension);
}

// returns true or false if the contract is an active extension
async function isExtension(proposal: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'base-dao',
        functionName: 'is-extension',
        functionArgs: [principalCV(proposal)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return null;
  }
}
