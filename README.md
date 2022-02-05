# flaky_test

Inspired by https://github.com/denoland/flaky_test

https://deno.land/x/flaky_test

```ts
import { flakyTest } from "https://deno.land/x/flaky_test@{$VERSION}/mod.ts";

Deno.test({
  name: "overload_1",
  fn: flakyTest(() => {
    // some test code
  }),
});

Deno.test(
  "overload_2",
  flakyTest(() => {
    // some test code
  }),
);

Deno.test(flakyTest(function overload_3() {
  // some test code
}));

Deno.test(
  "overload_4",
  {},
  flakyTest(() => {
    // some test code
  }),
);

Deno.test(
  { name: "overload_5" },
  flakyTest(() => {
    // some test code
  }),
);

Deno.test(
  {},
  flakyTest(function overload_6() {
    // some test code
  }),
);
```
