const DEFAULT_TEST_RUNS = 3;

/**
 * This function runs the test three times and will only fail if all three fail.
 * @param  fn Same function as the function passed to Deno.test
 * @param  count Number of times to run the test (default is 3)
 * ```ts
 * Deno.test({
 *   name: "test name",
 *   fn: flakyTest(() => {
 *     // some test code
 *   }),
 * });
 * ```
 */
export function flakyTest(
  fn: Deno.TestDefinition["fn"],
  { count = DEFAULT_TEST_RUNS } = {},
): (t: Deno.TestContext) => Promise<void> {
  return Object.defineProperty(
    async (...ctx) => {
      const errors: Error[] = [];
      for (let i = 0; i < count; i++) {
        try {
          return await fn(...ctx);
        } catch (error) {
          errors.push(error);
        }
      }
      throw new AggregateError(errors);
    },
    "name",
    { value: fn.name, writable: false },
  );
}
