import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const contractName = requestUrl.searchParams.get('contractName');
  if (!contractName) return createResponse('Missing contractName parameter', 400);
  const assetContract = requestUrl.searchParams.get('assetContract');
  if (!assetContract) return createResponse('Missing assetContract parameter', 400);

  // get result from contract
  const allowed = await isAllowed(contractName, assetContract);

  // return result
  if (allowed === null) return createResponse(`Asset status not found: ${contractName} ${assetContract}`, 404);
  return createResponse(allowed);
}

// returns true if the asset is allowed in the given treasury contract
async function isAllowed(contractName: string, assetContract: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: contractName,
        functionName: 'is-allowed',
        functionArgs: [principalCV(assetContract)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return null;
  }
}
