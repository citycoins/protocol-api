import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const userId = requestUrl.searchParams.get('userId');
  if (!userId) return createResponse('Missing userId parameter', 400);

  // get result from contract
  const user = await getUser(userId);

  // return result
<<<<<<< HEAD
  if (!user) return new Response(`User not found: ${userId}`, { status: 404 });
  return new Response(user);
=======
  if (!user) return createResponse(`User not found: ${userId}`, 404);
  return createResponse(user);
>>>>>>> 49f6024 (fix: use createResponse helper to generate resopnses)
}

async function getUser(userId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd003-user-registry',
        functionName: 'get-user',
        functionArgs: [uintCV(Number(userId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? String(result) : null;
  } catch (err) {
    return null;
  }
}
