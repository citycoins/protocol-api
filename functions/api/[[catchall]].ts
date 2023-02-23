import { createResponse } from '../../lib/api-helpers';

// TODO: upgrade types and check if EventContext is found
export async function onRequest(context: any): Promise<Response> {
  return createResponse(
    `Welcome to the CityCoins API! Endpoints match the DAO contract names and function definitions. More info in the project readme: https://github.com/citycoins/protocol-api`,
    404
  );
}
