export {};

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  const requestUrl = new URL(context.request.url);
  const requestPath = requestUrl.pathname;
  const requestParams = Array.from(requestUrl.searchParams.entries());

  return new Response(
    JSON.stringify(
      {
        functionPath: context.functionPath,
        requestPath: requestPath,
        requestParams: requestParams,
        message: `Welcome to the CityCoins API! Endpoints match the DAO contract names and function definitions. More info in the project readme: https://github.com/citycoins/protocol-api`,
      },
      null,
      2
    )
  );
}
