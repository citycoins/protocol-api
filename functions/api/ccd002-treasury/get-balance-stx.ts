import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const contractName = requestUrl.searchParams.get('contractName');
  if (!contractName) return createResponse('Missing contractName parameter', 400);

  // get result from contract
  console.log(`contractName: ${contractName}`);
  const balance = await getBalanceStx(contractName);

  // return result
  if (balance === null) return createResponse(`Balance not found: ${contractName}`, 404);
  return createResponse(balance);
}

// returns the balance of the treasury contract
async function getBalanceStx(contractName: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: contractName,
        functionName: 'get-balance-stx',
        functionArgs: [],
        network: NETWORK('mainnet'),
      },
      true
    );
    console.log(`result: ${result}`);
    return Number(result);
  } catch (err) {
    return null;
  }
}
