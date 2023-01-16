import { Router } from "itty-router";
import {
  getAssetFromKV,
  MethodNotAllowedError,
  NotFoundError,
} from "@cloudflare/kv-asset-handler";
import { AssetManifestType } from "@cloudflare/kv-asset-handler/dist/types";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

// `wrangler publish src/index.ts --name my-worker`

const router = Router();

router.get("*", () => new Response("Hello world!"));

const EXTENSIONS = [".png", ".xml", ".ico", ".yml", ".json"];

export interface Env {
  CC_API: KVNamespace;
  __STATIC_CONTENT: KVNamespace;
  __STATIC_CONTENT_MANIFEST: AssetManifestType;
}

// default handler for all requests
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    if (matchDownload(request.url)) {
      // check if item should be downloaded from KV
      return await returnDownload(request, env, ctx);
    } else {
      // then route the request to itty-router
      return await handleRequest(request);
    }
  },
};

// test if the URL should download a file from KV
function matchDownload(target: string): boolean {
  const url = new URL(target);
  let isDownload = false;
  // check if the URL is at the base path
  if (url.pathname.split("/").length === 2) {
    // check if the file extension matches
    isDownload = EXTENSIONS.some((value) => {
      return url.pathname.endsWith(value);
    });
  }
  return isDownload;
}

async function returnDownload(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  try {
    const ASSET_MANIFEST = JSON.parse(String(env.__STATIC_CONTENT_MANIFEST));
    return await getAssetFromKV(
      {
        request,
        waitUntil(promise) {
          return ctx.waitUntil(promise);
        },
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: ASSET_MANIFEST,
      }
    );
  } catch (e) {
    if (e instanceof NotFoundError) {
      const pathname = new URL(request.url).pathname;
      return new Response(`Resource not found at ${pathname}`, { status: 404 });
    } else if (e instanceof MethodNotAllowedError) {
      return new Response("Access denied or invalid request", { status: 403 });
    } else {
      console.log(String(e));
      return new Response("An unexpected error occurred", { status: 500 });
    }
  }
}

// itty router handler
export const handleRequest = async (request: Request): Promise<Response> => {
  const response: Response = await router.handle(request);
  const newResponse = new Response(response.body, response);
  newResponse.headers.append("Access-Control-Allow-Origin", "*");
  newResponse.headers.append("Access-Control-Allow-Methods", "GET, OPTIONS");
  newResponse.headers.append("Access-Control-Max-Age", "86400");
  newResponse.headers.append("CityCoins-Protocol-API", "2.0.0");
  return newResponse;
};
