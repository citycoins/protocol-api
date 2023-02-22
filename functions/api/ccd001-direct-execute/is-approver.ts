import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const who = requestUrl.searchParams.get('who');
  if (!who) return new Response('Missing who parameter', { status: 400 });

  // get result from contract
  const approver = await isApprover(who);

  // return result
  return new Response(JSON.stringify(approver));
}

// returns true or false if the principal is an approver
async function isApprover(approver: string): Promise<boolean | undefined> {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd001-direct-execute',
        functionName: 'is-approver',
        functionArgs: [principalCV(approver)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return false;
  }
}
