import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { ActivationDetails, DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });

  // get result from contract
  const activationDetails = await getActivationDetails(cityId);

  // return result
  if (!activationDetails) return new Response(`Activation details not found: ${cityId}`, { status: 404 });
  return new Response(JSON.stringify(activationDetails));
}

// returns the activation detials for a given city id
async function getActivationDetails(cityId: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-activation-details',
        functionArgs: [uintCV(Number(cityId))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as ActivationDetails;
  } catch (err) {
    return null;
  }
}
