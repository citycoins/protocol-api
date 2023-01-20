import { EventContext, KVNamespace } from '@cloudflare/workers-types';

interface Env {
  KV: KVNamespace;
}

// TODO: EventContext needed more delcarations, using any for now
export async function onRequest(context: any): Promise<Response> {
  return new Response(context.request.path, {
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
    },
  });
}
