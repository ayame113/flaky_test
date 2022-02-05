# deno_deploy_template

Template repository for deno deploy.

## Features

- Deploy `serve.ts` from deno deploy's github integration.
- Add a request handler to `lisner.ts` to create a dynamic web page.
- Build a static website by placing static files in the `static/` folder.
- Using [dotenv](https://deno.land/x/dotenv) for local development.
- CI that has been set up.
  - Run the test with push and pull requests.
  - It checks for deno dependency updates daily and automatically opens pull
    requests for updates.
  - Upload the test coverage to codecov. (When using codecov with this template,
    please set "CODECOV_TOKEN" from the secrets value setting on github.)
