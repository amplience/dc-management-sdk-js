import test from 'ava';
import { AxiosHttpClient } from '../../http/AxiosHttpClient';
import { OAuth2Client } from './OAuth2Client';

/**
 * @hidden
 */
// tslint:disable-next-line
import MockAdapter from 'axios-mock-adapter';

test('get token should request a token on the first invocation', async (t) => {
  const httpClient = new AxiosHttpClient({});
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret',
    },
    {},
    httpClient
  );

  const mock = new MockAdapter(httpClient.client);
  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: 0,
      refresh_token: 'refresh',
    });

  t.is((await client.getToken()).access_token, 'token');
});

test('get auth header should return an auth header', async (t) => {
  const httpClient = new AxiosHttpClient({});
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret',
    },
    {},
    httpClient
  );

  const mock = new MockAdapter(httpClient.client);
  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: 0,
      refresh_token: 'refresh',
    });

  const authHeader = await client.getAuthHeader();
  t.is(authHeader, 'bearer token');
});

test('get token should cache tokens', async (t) => {
  const httpClient = new AxiosHttpClient({});
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret',
    },
    {},
    httpClient
  );

  const mock = new MockAdapter(httpClient.client);
  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: 60,
      refresh_token: 'refresh',
    });

  const token1 = await client.getToken();

  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token2',
      expires_in: 60,
      refresh_token: 'refresh',
    });

  const token2 = await client.getToken();

  t.is(token1.access_token, 'token');
  t.is(token2.access_token, 'token');
});

test('cached tokens should expire', async (t) => {
  const httpClient = new AxiosHttpClient({});
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret',
    },
    {},
    httpClient
  );

  const mock = new MockAdapter(httpClient.client);
  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: -60,
      refresh_token: 'refresh',
    });

  const token1 = await client.getToken();

  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token2',
      expires_in: 300,
      refresh_token: 'refresh',
    });

  const token2 = await client.getToken();

  t.is(token1.access_token, 'token');
  t.is(token2.access_token, 'token2');
});

test('cached tokens should expire if they have less than 30 seconds left', async (t) => {
  const httpClient = new AxiosHttpClient({});
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret',
    },
    {},
    httpClient
  );

  const mock = new MockAdapter(httpClient.client);
  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: 30,
      refresh_token: 'refresh',
    });

  const token1 = await client.getToken();

  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token2',
      expires_in: 300,
      refresh_token: 'refresh',
    });

  t.is(token1.access_token, 'token');
  t.is((await client.getToken()).access_token, 'token2');
  t.is((await client.getToken()).access_token, 'token2');
});

test('only one token refresh should be in flight at once', async (t) => {
  const httpClient = new AxiosHttpClient({});
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret',
    },
    {},
    httpClient
  );

  const mock = new MockAdapter(httpClient.client, { delayResponse: 2000 });

  mock
    .onPost(
      'https://auth.amplience.net/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .replyOnce(200, {
      access_token: 'token',
      expires_in: 0,
      refresh_token: 'refresh',
    });

  const token1 = client.getToken();
  const token2 = client.getToken();

  t.is((await token1).access_token, 'token');
  t.is((await token2).access_token, 'token');
});
