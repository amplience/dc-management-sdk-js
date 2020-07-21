import test from 'ava';
import { AxiosHttpClient } from './AxiosHttpClient';
import { HttpMethod } from './HttpRequest';

// axios-mock-adaptor's typedefs are wrong preventing calling onGet with 3 args, this is a workaround
/**
 * @hidden
 */
// eslint-disable-next-line
const MockAdapter = require('axios-mock-adapter');

test('client should use provided base url', async (t) => {
  const client = new AxiosHttpClient({
    baseURL: 'http://mywebsite.com',
  });

  const mock = new MockAdapter(client.client);
  mock.onGet('http://mywebsite.com/ping').reply(200, 'pong');

  const response = await client.request({
    method: HttpMethod.GET,
    url: 'http://mywebsite.com/ping',
  });

  t.is(response.data, 'pong');
});

test('client should return status code', async (t) => {
  const client = new AxiosHttpClient({});

  const mock = new MockAdapter(client.client);
  mock.onGet('/ping').reply(404);

  const response = await client.request({
    method: HttpMethod.GET,
    url: '/ping',
  });

  t.is(response.status, 404);
});

test('client should use provided method', async (t) => {
  const client = new AxiosHttpClient({});

  const mock = new MockAdapter(client.client);
  mock.onDelete('/resource').reply(200);

  const response = await client.request({
    method: HttpMethod.DELETE,
    url: '/resource',
  });

  t.is(response.status, 200);
});

test('client should send form data', async (t) => {
  const client = new AxiosHttpClient({});

  const mock = new MockAdapter(client.client);
  mock
    .onPost(
      '/oauth/token',
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret'
    )
    .reply(200, {
      access_token: 'token',
      expires_in: 0,
      refresh_token: 'refresh',
    });

  const response = await client.request({
    data:
      'grant_type=client_credentials&client_id=client_id&client_secret=client_secret',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: HttpMethod.POST,
    url: '/oauth/token',
  });

  t.is(response.status, 200);
});

test('client should send JSON data', async (t) => {
  const client = new AxiosHttpClient({});

  const mock = new MockAdapter(client.client);
  mock
    .onPost('/resource/create', {
      key: 'value',
    })
    .reply(200, {
      access_token: 'token',
      expires_in: 0,
      refresh_token: 'refresh',
    });

  const response = await client.request({
    data: {
      key: 'value',
    },
    headers: {
      'Content-Type': 'application/json',
    },
    method: HttpMethod.POST,
    url: '/resource/create',
  });

  t.is(response.status, 200);
});
