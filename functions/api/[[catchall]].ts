import { Router } from 'itty-router';
import GetStacksBlockHeight from '../../src/components/api-handlers/get-stacks-block-height';

const router = Router({ base: '/api' });

router.get('/', () => new Response('api root'));
router.get('/one', () => new Response('one'));
router.get('/one/two', () => new Response('one two'));
router.get('/one/two/three', () => new Response('one two three'));
router.get('/get-stacks-block-height', GetStacksBlockHeight);
router.get('*', () => new Response(`Unknown path`));

export async function onRequest(context): Promise<Response> {
  return await router.handle(context.request);
}
