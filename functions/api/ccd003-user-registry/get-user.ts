import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const userId = requestUrl.searchParams.get('userId');
  if (!userId) return new Response('Missing userId parameter', { status: 400 });

  // get result from contract
  const user = await getUser(userId);

  // return result
  if (!user) return new Response(`User not found: ${userId}`, { status: 404 });
  return new Response(user);
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
    return result ? String(result) : undefined;
  } catch (err) {
    return undefined;
  }
}
