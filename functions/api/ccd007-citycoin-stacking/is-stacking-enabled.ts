import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const stackingEnabled = await isStackingEnabled();

  // return result
<<<<<<< HEAD
  if (stackingEnabled === null) return new Response(`Stacking status not found`, { status: 404 });
  return new Response(JSON.stringify(stackingEnabled));
=======
  if (stackingEnabled === undefined) return createResponse(`Stacking status not found`, 404);
  return createResponse(stackingEnabled);
>>>>>>> 49f6024 (fix: use createResponse helper to generate resopnses)
}

// returns true if stacking is enabled
async function isStackingEnabled() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd007-citycoin-stacking',
        functionName: 'is-stacking-enabled',
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
