import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // get result from contract
  const poolOperator = await getPoolOperator();

  // return result
  if (!poolOperator) return new Response(`Pool operator not found`, { status: 404 });
  return new Response(JSON.stringify(poolOperator));
}

// returns the pool operator
async function getPoolOperator() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd011-stacking-payouts',
        functionName: 'get-pool-operator',
        functionArgs: [],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? String(result) : undefined;
  } catch (err) {
    return undefined;
  }
}
