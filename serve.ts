import { serve } from "https://deno.land/std@0.123.0/http/server.ts";
import * as path from "https://deno.land/std@0.123.0/path/mod.ts";
import { contentType } from "https://deno.land/x/media_types@v2.12.1/mod.ts";

import { listeners } from "./listener.ts";

// export for test
export function createServer() {
  const controller = new AbortController();
  const server = serve(async (request) => {
    const url = new URL(request.url);

    // serving dynamic web page from listener.ts
    try {
      for (const listener of listeners) {
        const pattern = listener.pattern.exec(url);
        if (pattern) {
          return listener.handler({ request, url, pattern });
        }
      }
    } catch {
      return new Response("500 Internal Server Error\n", { status: 500 });
    }

    // serving static web page from static folder
    try {
      return new Response(
        await Deno.readFile(
          new URL(`./static${url.pathname}`, import.meta.url),
        ),
        {
          headers: {
            "Content-Type": contentType(path.extname(request.url)) ??
              "text/plain; charset=utf-8",
          },
        },
      );
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return new Response("404 Not Found\n", { status: 404 });
      }
      return new Response("500 Internal Server Error\n", { status: 500 });
    }
  }, controller);
  return { server, controller };
}

if (import.meta.main) {
  createServer();
}
