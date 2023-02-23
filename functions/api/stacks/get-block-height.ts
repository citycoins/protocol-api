import { CoreNodeInfoResponse } from '@stacks/stacks-blockchain-api-types';
import { createResponse } from '../../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  const blockHeight = async () => {
    const url = new URL('https://stacks-node-api.mainnet.stacks.co');
    url.pathname = '/v2/info';
    const response = await fetch(url.toString());
    if (!response.ok) {
      return null;
    }
    const responseJson: CoreNodeInfoResponse = await response.json();
    return Number(responseJson.stacks_tip_height);
  };

  // TODO: look at this approach again
  const currentBlockHeight = await blockHeight();
  if (currentBlockHeight === null) return createResponse('Error fetching block height, please try again', 500);
  return createResponse(currentBlockHeight);
}
