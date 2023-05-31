import { fetchReadOnlyFunction } from 'micro-stacks/api';
import { uintCV } from 'micro-stacks/clarity';
import { createResponse, DEPLOYER, MiningStats, NETWORK } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  // check query parameters
  const requestUrl = new URL(context.request.url);
  const cityId = requestUrl.searchParams.get('cityId');
  if (!cityId) return createResponse('Missing cityId parameter', 400);
  const height = requestUrl.searchParams.get('height');
  if (!height) return createResponse('Missing height parameter', 400);

  // get result from contract
  const miningStats = await getMiningStats(cityId, height);

  // return result
  if (!miningStats) return createResponse(`Mining stats not found: ${cityId} ${height}`, 404);
  return createResponse(miningStats);
}

// returns the mining stats for a given city ID and block height
async function getMiningStats(cityId: string, height: string) {
  try {
    const result = await fetchReadOnlyFunction(
      {
        contractAddress: DEPLOYER('mainnet'),
        contractName: 'ccd006-citycoin-mining-v2',
        functionName: 'get-mining-stats',
        functionArgs: [uintCV(Number(cityId)), uintCV(Number(height))],
        network: NETWORK('mainnet'),
      },
      true
    );
    return result as MiningStats;
  } catch (err) {
    return null;
  }
}
