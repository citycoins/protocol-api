import { CoreNodeInfoResponse } from '@stacks/stacks-blockchain-api-types';
import { IRequest } from 'itty-router';

export async function GetStacksBlockHeight(request: IRequest): Promise<number> {
  const blockHeight = async () => {
    const url = new URL('https://stacks-node-api.mainnet.stacks.co');
    url.pathname = '/v2/info';
    const response = await fetch(url.toString());
    if (!response.ok) {
      return 0;
    }
    const responseJson: CoreNodeInfoResponse = await response.json();
    return Number(responseJson.stacks_tip_height);
  };

  return await blockHeight();
}
