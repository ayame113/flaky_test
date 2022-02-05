// Using dotenv only for local development.
// For deno deploy, using built-in environment variable support.
import "https://deno.land/x/dotenv@v3.1.0/load.ts";

interface Listener {
  pattern: URLPattern;
  handler: (
    { request, url, pattern }: {
      request: Readonly<Request>;
      url: Readonly<URL>;
      pattern: URLPatternResult;
    },
  ) => Response | Promise<Response>;
}

export const listeners: Listener[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: ({ request, url, pattern }) => {
      console.log(request, url, pattern.pathname);
      return new Response(
        'Hello World from <a href="https://github.com/ayame113/deno_deploy_template">ayame113/deno_deploy_template</a> !',
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        },
      );
    },
  },
  /*{
    // Process the request when this pattern is matched.
    // See also URLPattern API:
    // https://developer.mozilla.org/en-US/docs/Web/API/URLPattern

    pattern: new URLPattern({ pathname: "/foobar/:id" }),

    // Handle the request.
    // - request: Request object.
    // - url: URL object (requested url).
    // should return the Response object.

    handler: ({ request, url }) => {
      console.log(request, url);
      return new Response(
        'Hello World from <a href="https://github.com/ayame113/deno_deploy_template">ayame113/deno_deploy_template</a> !',
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        },
      );
    },
  },*/
];
