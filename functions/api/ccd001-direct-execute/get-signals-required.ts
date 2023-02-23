import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(): Promise<Response> {
  // get result from contract
  const signalsRequired = await getSignalsRequired();

  // return result
  if (!signalsRequired) return createResponse('Signals required not found', 404);
  return createResponse(signalsRequired);
}

// returns signals required in ccd001-direct-execute
async function getSignalsRequired() {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd001-direct-execute',
        functionName: 'get-signals-required',
        functionArgs: [],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Number(result);
  } catch (err) {
    return null;
  }
}
