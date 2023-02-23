export {};

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  const requestUrl = new URL(context.request.url);
  const requestPath = requestUrl.pathname;
  const requestParams = Array.from(requestUrl.searchParams.entries());

  return new Response(
    JSON.stringify(
      {
        catchall: true,
        functionPath: context.functionPath,
        requestPath: requestPath,
        requestParams: requestParams,
      },
      null,
      2
    ),
    { status: 404 }
  );
}
