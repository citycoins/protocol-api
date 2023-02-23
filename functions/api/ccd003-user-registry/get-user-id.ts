import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const user = requestUrl.searchParams.get('user');
  if (!user) return createResponse('Missing user parameter', 400);

  // get result from contract
  const userId = await getUserId(user);

  // return result
  if (!userId) return createResponse(`User ID not found: ${user}`, 404);
  return createResponse(userId);
}

async function getUserId(user: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd003-user-registry',
        functionName: 'get-user-id',
        functionArgs: [principalCV(user)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? Number(result) : null;
  } catch (err) {
    return null;
  }
}
