import { PagesFunction } from '@cloudflare/workers-types';

export interface Env {
  HIRO_API_KEY: string;
}

// Set CORS to all /api responses
export const onRequest: PagesFunction<Env> = async ({ next, env }) => {
  const response = await next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Max-Age', '86400');
  response.headers.set('CityCoins-Protocol-API', '0.0.2');
  response.headers.set('x-hiro-api-key', env.HIRO_API_KEY);
  return response;
};
