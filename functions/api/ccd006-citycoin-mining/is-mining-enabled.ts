import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const enabled = await isMiningEnabled();

  // return result
<<<<<<< HEAD
  if (enabled === null) return new Response(`Mining enabled status not found`, { status: 404 });
  return new Response(JSON.stringify(enabled));
=======
  if (enabled === undefined) return createResponse(`Mining enabled status not found`, 404);
  return createResponse(enabled);
>>>>>>> 49f6024 (fix: use createResponse helper to generate resopnses)
}

// returns true if mining is enabled
async function isMiningEnabled() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining',
        functionName: 'is-mining-enabled',
        functionArgs: [],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return null;
  }
}
