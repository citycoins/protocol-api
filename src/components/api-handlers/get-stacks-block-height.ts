import { CoreNodeInfoResponse } from '@stacks/stacks-blockchain-api-types';
import { IRequest } from 'itty-router';

export default async function GetStacksBlockHeight(request: IRequest): Promise<Response> {
  const blockHeight = async (): Promise<number> => {
    const url = new URL('https://stacks-node-api.mainnet.stacks.co');
    url.pathname = '/v2/info';
    const response = await fetch(url.toString());
    if (!response.ok) {
      return 0;
    }
    const responseJson: CoreNodeInfoResponse = await response.json();
    return Number(responseJson.stacks_tip_height);
  };

  return new Response(
    JSON.stringify({
      block_height: await blockHeight(),
      query_params: request.query,
    })
  );
}
