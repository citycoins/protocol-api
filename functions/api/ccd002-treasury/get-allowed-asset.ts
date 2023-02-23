import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { principalCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const contractName = requestUrl.searchParams.get('contractName');
  if (!contractName) return new Response('Missing contractName parameter', { status: 400 });
  const assetContract = requestUrl.searchParams.get('assetContract');
  if (!assetContract) return new Response('Missing assetContract parameter', { status: 400 });

  // get result from contract
  const allowed = await getAllowedAsset(contractName, assetContract);
  // return result
  if (allowed === undefined) return new Response(`Asset status not found: ${contractName} ${assetContract}`, { status: 404 });
  return new Response(JSON.stringify(allowed));
}

// returns true if the asset is allowed in the given treasury contract
async function getAllowedAsset(contractName: string, assetContract: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: contractName,
        functionName: 'get-allowed-asset',
        functionArgs: [principalCV(assetContract)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return Boolean(result);
  } catch (err) {
    return undefined;
  }
}
