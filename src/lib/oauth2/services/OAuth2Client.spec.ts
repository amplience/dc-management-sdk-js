import test from 'ava';
import { OAuth2Client } from './OAuth2Client';

// axios-mock-adaptor's typedefs are wrong preventing calling onGet with 3 args, this is a workaround
/**
 * @hidden
 */
// tslint:disable-next-line
const MockAdapter = require('axios-mock-adapter');

test('get token should request a token on the first invocation', async t => {
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    {}
  );

  const mock = new MockAdapter(client.client);
  mock
    .onPost(
      'https://auth.adis.ws/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: 0,
      refresh_token: 'refresh'
    });

  t.is((await client.getToken()).access_token, 'token');
});

test('get token should cache tokens', async t => {
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    {}
  );

  const mock = new MockAdapter(client.client);
  mock
    .onPost(
      'https://auth.adis.ws/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: 60,
      refresh_token: 'refresh'
    });

  const token1 = await client.getToken();

  mock
    .onPost(
      'https://auth.adis.ws/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token2',
      expires_in: 60,
      refresh_token: 'refresh'
    });

  const token2 = await client.getToken();

  t.is(token1.access_token, 'token');
  t.is(token2.access_token, 'token');
});

test('cached tokens should expire', async t => {
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    {}
  );

  const mock = new MockAdapter(client.client);
  mock
    .onPost(
      'https://auth.adis.ws/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: -60,
      refresh_token: 'refresh'
    });

  const token1 = await client.getToken();

  mock
    .onPost(
      'https://auth.adis.ws/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token2',
      expires_in: 0,
      refresh_token: 'refresh'
    });

  const token2 = await client.getToken();

  t.is(token1.access_token, 'token');
  t.is(token2.access_token, 'token2');
});

test('only one token refresh should be in flight at once', async t => {
  const client = new OAuth2Client(
    {
      client_id: 'client_id',
      client_secret: 'client_secret'
    },
    {}
  );

  const mock = new MockAdapter(client.client, { delayResponse: 2000 });

  mock
    .onPost(
      'https://auth.adis.ws/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .replyOnce(200, {
      access_token: 'token',
      expires_in: 0,
      refresh_token: 'refresh'
    });

  const token1 = client.getToken();
  const token2 = client.getToken();

  t.is((await token1).access_token, 'token');
  t.is((await token2).access_token, 'token');
});
