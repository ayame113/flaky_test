const DEFAULT_TEST_RUNS = 3;
export function flakyTest(
  fn: Deno.TestDefinition["fn"],
  { count }: { count?: number } = {},
): (t: Deno.TestContext) => Promise<void> {
  return Object.defineProperty(
    async (...ctx) => {
      const errors: Error[] = [];
      for (let i = 0; i < (count ?? DEFAULT_TEST_RUNS); i++) {
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
