import { Router } from 'itty-router';

const router = Router();

router.get('/api', () => new Response('api root'));
router.get('/api/one', () => new Response('one'));
router.get('/api/one/two', () => new Response('one two'));
router.get('/api/one/two/three', () => new Response('one two three'));
router.get('*', () => new Response(`Unknown path`));

export async function onRequest(context): Promise<Response> {
  return await router.handle(context.request);
}
