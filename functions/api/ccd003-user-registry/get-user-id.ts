import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const user = requestUrl.searchParams.get('user');
  if (!user) return new Response('Missing user parameter', { status: 400 });

  // get result from contract
  const userId = await getUserId(user);

  // return result
  if (!userId) return new Response(`User ID not found: ${user}`, { status: 404 });
  return new Response(JSON.stringify(userId));
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
