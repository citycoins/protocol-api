import { KVNamespace, PagesFunction } from '@cloudflare/workers-types';

// Set CORS to all /api responses
export const onRequest: PagesFunction = async ({ next }) => {
  const response = await next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Max-Age', '86400');
  response.headers.set('CityCoins-Protocol-API', '0.0.1');
  return response;
};
