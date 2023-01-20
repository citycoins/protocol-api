export async function onRequest(context): Promise<Response> {
  console.log('Hello API!');
  return new Response('Hello API!');
}
