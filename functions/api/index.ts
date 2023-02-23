export {};

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  return new Response(
    `Welcome to the CityCoins API! Endpoints match the DAO contract names and function definitions. More info in the project readme:\n\nhttps://github.com/citycoins/protocol-api`
  );
}
