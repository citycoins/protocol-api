import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { stringAsciiCV, uintCV } from 'micro-stacks/clarity';
import { DEPLOYER, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return new Response('Missing cityId parameter', { status: 400 });
  const treasuryName = requestUrl.searchParams.get('treasuryName');
  if (!treasuryName) return new Response('Missing treasuryName parameter', { status: 400 });

  // get result from contract
  const treasuryAddress = await getTreasuryByName(Number(cityId), treasuryName);

  // return result
  if (!treasuryAddress) return new Response(`Treasury address not found: ${cityId} ${treasuryName}`, { status: 404 });
  return new Response(treasuryAddress);
}

// returns the treasury address for a given city ID and treasury name
async function getTreasuryByName(cityId: number, treasuryName: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd005-city-data',
        functionName: 'get-treasury-by-name',
        functionArgs: [uintCV(Number(cityId)), stringAsciiCV(treasuryName)],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result ? String(result) : null;
  } catch (err) {
    return null;
  }
}
