import test from 'ava';
import { HttpMethod } from '../../..';
import { AxiosHttpClient } from '../../http/AxiosHttpClient';
import { HttpError } from '../../http/HttpError';
import { ContentRepository } from '../../model/ContentRepository';
import { Hub } from '../../model/Hub';
import { DefaultHalClient, HalClient } from './HalClient';

// axios-mock-adaptor's typedefs are wrong preventing calling onGet with 3 args, this is a workaround
/**
 * @hidden
 */
// eslint-disable-next-line
const MockAdapter = require('axios-mock-adapter');

/**
 * @hidden
 */
function createMockClient(): [HalClient, any] {
  const httpClient = new AxiosHttpClient({});
  const client = new DefaultHalClient('', httpClient, tokenProvider);
  const mock = new MockAdapter(httpClient.client);

  return [client, mock];
}

/**
 * @hidden
 */
const tokenProvider = {
  getToken: () =>
    Promise.resolve({
      access_token: 'token',
      expires_in: 500,
      refresh_token: 'refresh',
    }),
};

test('fetchResource should load and parse resource', async (t) => {
  const [client, mock] = createMockClient();

  mock.onGet('/hubs/1').reply(200, {
    name: 'hub 1',
  });

  const hub = await client.fetchResource('/hubs/1', Hub);
  t.is(hub.name, 'hub 1');
});

test('fetchLinkedResource should follow href', async (t) => {
  const [client, mock] = createMockClient();

  mock.onGet('/hubs/1').reply(200, {
    name: 'hub 1',
  });

  const hub = await client.fetchLinkedResource({ href: '/hubs/1' }, {}, Hub);
  t.is(hub.name, 'hub 1');
});

test('fetchLinkedResource should process templated links', async (t) => {
  const [client, mock] = createMockClient();

  mock.onGet('/hubs/1').reply(200, {
    name: 'hub 1',
  });

  const hub = await client.fetchLinkedResource(
    { href: '/hubs/{id}', templated: true },
    { id: '1' },
    Hub
  );
  t.is(hub.name, 'hub 1');
});

test('createResource should post and parse the resource', async (t) => {
  const [client, mock] = createMockClient();

  mock.onPost('/hubs').reply(200, {
    id: 'hub 1',
    name: 'hub 1',
  });

  let hub = new Hub();
  hub.name = 'hub 1';
  hub = await client.createResource('/hubs', hub, Hub);
  t.is(hub.id, 'hub 1');
});

test('createLinkedResource should follow href', async (t) => {
  const [client, mock] = createMockClient();

  mock.onPost('/hubs').reply(200, {
    id: 'hub 1',
    name: 'hub 1',
  });

  let hub = new Hub();
  hub.name = 'hub 1';
  hub = await client.createLinkedResource({ href: '/hubs' }, {}, hub, Hub);
  t.is(hub.id, 'hub 1');
});

test('createLinkedResource should process templated links', async (t) => {
  const [client, mock] = createMockClient();

  mock.onPost('/hubs/1/content-repositories').reply(200, {
    id: 'repo 1',
    name: 'repo 1',
  });

  let repo = new ContentRepository();
  repo.name = 'repo 1';
  repo = await client.createLinkedResource(
    { href: '/hubs/{id}/content-repositories', templated: true },
    { id: '1' },
    repo,
    ContentRepository
  );
  t.is(repo.id, 'repo 1');
});

test('requests should include auth token', async (t) => {
  const [client, mock] = createMockClient();

  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token',
    })
    .reply(200, {
      name: 'hub 1',
    });

  const hub = await client.fetchResource('/hubs/1', Hub);
  t.is(hub.name, 'hub 1');
});

test('should ask for token from provider every request', async (t) => {
  const httpClient = new AxiosHttpClient({});

  let tokenCount = 0;
  const client = new DefaultHalClient('', httpClient, {
    getToken: () =>
      Promise.resolve({
        access_token: 'token' + tokenCount++,
        expires_in: 500,
        refresh_token: 'refresh',
      }),
  });

  const mock = new MockAdapter(httpClient.client);
  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token0',
    })
    .reply(200, {
      name: 'hub 1',
    });
  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token1',
    })
    .reply(200, {
      name: 'hub 1',
    });

  const hub = await client.fetchResource('/hubs/1', Hub);
  const hub2 = await client.fetchResource('/hubs/1', Hub);
  t.is(hub2.name, 'hub 1');
});

test('parse should instantiate and parse the resource', (t) => {
  const [client, mock] = createMockClient();

  const hub = client.parse({ name: 'hub' }, Hub);
  t.is(hub.name, 'hub');
});

test('serialize should make a copy of the object', (t) => {
  const [client, mock] = createMockClient();

  const hub = new Hub();
  hub.name = 'hub';
  const hubJson = client.serialize(hub);

  t.not(hub, hubJson);
  t.is(hubJson.name, 'hub');
});

test('api errors should be surfaced in the rejection error', async (t) => {
  const [client, mock] = createMockClient();

  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token',
    })
    .reply(403, {
      errors: [{ message: 'Authorization Required' }],
    });

  const error: HttpError = await t.throws(
    async () => client.fetchResource('/hubs/1', Hub),
    HttpError
  );
  t.deepEqual(error.request, {
    data: undefined,
    headers: {
      Authorization: 'bearer token',
    },
    method: HttpMethod.GET,
    url: '/hubs/1',
  });
  t.deepEqual(error.response, {
    data: {
      errors: [{ message: 'Authorization Required' }],
    },
    status: 403,
  });
  t.is(
    error.message,
    'Request failed with status code 403: {"errors":[{"message":"Authorization Required"}]}'
  );
});

test('unknown errors should describe the status code', async (t) => {
  const [client, mock] = createMockClient();

  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token',
    })
    .reply(403, {
      errors: [{ message: 'Authorization Required' }],
    });

  const error: HttpError = await t.throws(
    async () => client.fetchResource('/hubs/1', Hub),
    HttpError
  );
  t.deepEqual(error.request, {
    data: undefined,
    headers: {
      Authorization: 'bearer token',
    },
    method: HttpMethod.GET,
    url: '/hubs/1',
  });
  t.deepEqual(error.response, {
    data: {
      errors: [{ message: 'Authorization Required' }],
    },
    status: 403,
  });
  t.is(
    error.message,
    'Request failed with status code 403: {"errors":[{"message":"Authorization Required"}]}'
  );
});
