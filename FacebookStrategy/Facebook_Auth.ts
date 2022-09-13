import { FacebookClient } from "./Facebook_client.ts";

export abstract class FacebookGrant {
  constructor(protected readonly client: FacebookClient) {}
}

export class FacebookStrategy extends FacebookGrant {
  constructor(client: FacebookClient) {
    super(client);
  }
  /* https://www.facebook.com/v14.0/dialog/oauth?
  client_id={app-id}
  &redirect_uri={redirect-uri}
  &state={state-param}
  */

  // part 1
  /** Builds a URI you can redirect a user to to make the authorization request. */
  createLink = () => {
    // The primary reason for using the state parameter is to mitigate CSRF attacks by using a unique and non-guessable value associated with each authentication request about to be initiated.
    const state: number = Math.floor(Math.random() * 1000000000);
    const encodeRedirect: string = encodeURIComponent(
      this.client.config.redirect
    );

    const codeURI = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${this.client.config.clientId}&redirect_uri=${encodeRedirect}&state=${state}&response_type=code`;
    return codeURI;
  };
  // part 2
  async processAuth(requestUrl: string) {
    /** Parses the authorization response request tokens from the authorization server. */
    const url = new URL(requestUrl);
    const { searchParams } = url;

    const code: string | null = searchParams.get("code");

    if (!code) {
      return new Error("Could not fetch the code");
    }

    const encodeRedirect: string = encodeURIComponent(
      this.client.config.redirect
    );

    const uri = `${this.client.config.tokenUri}?client_id=${this.client.config.clientId}&redirect_uri=${encodeRedirect}&client_secret=${this.client.config.clientSecret}&code=${code}`;

    const response = await fetch(uri);
    const json = await response.json();
    return json;
  }
}
