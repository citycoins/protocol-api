import { CoreNodeInfoResponse } from '@stacks/stacks-blockchain-api-types';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  const blockHeight = async () => {
    const url = new URL('https://stacks-node-api.mainnet.stacks.co');
    url.pathname = '/v2/info';
    const response = await fetch(url.toString());
    if (!response.ok) {
      return new Response('Error fetching block height, please try again', { status: 500 });
    }
    const responseJson: CoreNodeInfoResponse = await response.json();
    return Number(responseJson.stacks_tip_height);
  };

  const currentBlockHeight = await blockHeight();

  return new Response(JSON.stringify(currentBlockHeight));
}
