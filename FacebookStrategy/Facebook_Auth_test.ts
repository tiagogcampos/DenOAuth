import { FacebookClient } from "./Facebook_client.ts";
import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";

Deno.test("Facebook's createLink method should return the correct url", () => {
  const client = new FacebookClient({
    clientId: "688zz8dnnxjo4t",
    clientSecret: "YHhQQW3BaNQCFilB",
    redirect: "http://localhost:3000/response",
    tokenUri: "https://graph.facebook.com/v14.0/oauth/access_token",
  });

  const dummy = client.code.createLink();
  const dummyEncode = encodeURIComponent("http://localhost:3000/response");

  const url = new URL(dummy);
  const { searchParams } = url;
  const state = searchParams.get("state");

  assertEquals(
    dummy,
    `https://www.facebook.com/v14.0/dialog/oauth?client_id=688zz8dnnxjo4t&redirect_uri=${dummyEncode}&state=${state}&response_type=code`
  );
});
