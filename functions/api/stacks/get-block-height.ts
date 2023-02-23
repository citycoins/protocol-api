import { CoreNodeInfoResponse } from '@stacks/stacks-blockchain-api-types';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  const requestUrl = new URL(context.request.url);
  const requestPath = requestUrl.pathname;
  const requestParams = Array.from(requestUrl.searchParams.entries());

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
    JSON.stringify(
      {
        block_height: await blockHeight(),
        functionPath: context.functionPath,
        requestPath: requestPath,
        requestParams: requestParams,
      },
      null,
      2
    )
  );
}
