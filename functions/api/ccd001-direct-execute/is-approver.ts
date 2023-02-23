import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const who = requestUrl.searchParams.get('who');
  if (!who) return createResponse('Missing who parameter', 400);

  // get result from contract
  const approver = await isApprover(who);

  // return result
  if (approver === null) return createResponse(`Approver not found: ${who}`, 404);
  return createResponse(approver);
}

// returns true or false if the principal is an approver
async function isApprover(who: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd001-direct-execute',
        functionName: 'is-approver',
        functionArgs: [principalCV(who)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return typeof result === 'boolean' ? Boolean(result) : null;
  } catch (err) {
    return null;
  }
}
