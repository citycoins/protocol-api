import { Router } from 'itty-router';

const router = Router();

// router.get('/', () => new Response('Hello API!'));

export async function onRequest(context): Promise<Response> {
  console.log(`Hello API!`);
  return new Response(JSON.stringify(context));
}
