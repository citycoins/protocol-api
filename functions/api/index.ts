export async function onRequest(): Promise<Response> {
  console.log('Hello API!');
  return new Response('Hello API!');
}
