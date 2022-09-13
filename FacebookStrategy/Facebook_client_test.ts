import { assert } from "https://deno.land/std@0.119.0/testing/asserts.ts";

import { FacebookStrategy } from "./Facebook_Auth.ts";
import { FacebookClient } from "./Facebook_client.ts";

Deno.test("FacebookClient.code is created", () => {
  const client = new FacebookClient({
    clientId: "",
    clientSecret: "",
    redirect: "",
    tokenUri: "",
  });
  assert(client.code instanceof FacebookStrategy);
});
