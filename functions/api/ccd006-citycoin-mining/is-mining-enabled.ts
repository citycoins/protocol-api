import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const enabled = await isMiningEnabled();

  // return result
  if (enabled === null) return new Response(`Mining enabled status not found`, { status: 404 });
  return new Response(JSON.stringify(enabled));
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
