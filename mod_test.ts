import {
  assertEquals,
  assertRejects,
} from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { flakyTest } from "./mod.ts";

Deno.test("not throws", async (t) => {
  let count = 0;
  await flakyTest(() => {
    count++;
  })(t);
  assertEquals(count, 1);
});

Deno.test("throws once", async (t) => {
  let count = 0;
  await flakyTest(() => {
    count++;
    if (count < 2) {
      throw new Error("throws once");
    }
  })(t);
  assertEquals(count, 2);
});

Deno.test("throws twice", async (t) => {
  let count = 0;
  await flakyTest(() => {
    count++;
    if (count < 3) {
      throw new Error("throws once");
    }
  })(t);
  assertEquals(count, 3);
});

Deno.test("throws three times", async (t) => {
  let count = 0;
  await assertRejects(async () => {
    await flakyTest(() => {
      count++;
      if (count < 4) {
        throw new Error("throws once");
      }
    })(t);
  }, AggregateError);
  assertEquals(count, 3);
});

Deno.test("throws three times, try 4 times", async (t) => {
  let count = 0;
  await flakyTest(() => {
    count++;
    if (count < 4) {
      throw new Error("throws once");
    }
  }, { count: 4 })(t);
  assertEquals(count, 4);
});

Deno.test("set func name", () => {
  const f = flakyTest(function __name__() {});
  assertEquals(f.name, "__name__");
});

Deno.test("not throws with async function", async (t) => {
  let count = 0;
  await flakyTest(async () => {
    count++;
    await Promise.resolve();
  })(t);
  assertEquals(count, 1);
});

Deno.test("throws three times with async function", async (t) => {
  let count = 0;
  await assertRejects(async () => {
    await flakyTest(async () => {
      count++;
      await Promise.reject();
    })(t);
  }, AggregateError);
  assertEquals(count, 3);
});

Deno.test({
  name: "overload_1",
  fn: flakyTest(() => {}),
});
Deno.test("overload_2", flakyTest(() => {}));
Deno.test(flakyTest(function overload_3() {}));
Deno.test("overload_4", {}, flakyTest(() => {}));
Deno.test({ name: "overload_5" }, flakyTest(() => {}));
Deno.test({}, flakyTest(function overload_6() {}));
