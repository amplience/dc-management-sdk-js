import test from 'ava';
import { ContentRepository } from '../../model/ContentRepository';
import { Hub } from '../../model/Hub';
import { HalClient } from './HalClient';

// axios-mock-adaptor's typedefs are wrong preventing calling onGet with 3 args, this is a workaround
/**
 * @hidden
 */
// tslint:disable-next-line
const MockAdapter = require('axios-mock-adapter');

test('fetchResource should load and parse resource', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock.onGet('/hubs/1').reply(200, {
    name: 'hub 1'
  });

  const hub = await client.fetchResource('/hubs/1', Hub);
  t.is(hub.name, 'hub 1');
});

test('fetchLinkedResource should follow href', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock.onGet('/hubs/1').reply(200, {
    name: 'hub 1'
  });

  const hub = await client.fetchLinkedResource({ href: '/hubs/1' }, {}, Hub);
  t.is(hub.name, 'hub 1');
});

test('fetchLinkedResource should process templated links', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock.onGet('/hubs/1').reply(200, {
    name: 'hub 1'
  });

  const hub = await client.fetchLinkedResource(
    { href: '/hubs/{id}', templated: true },
    { id: '1' },
    Hub
  );
  t.is(hub.name, 'hub 1');
});

test('createResource should post and parse the resource', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock.onPost('/hubs').reply(200, {
    id: 'hub 1',
    name: 'hub 1'
  });

  let hub = new Hub();
  hub.name = 'hub 1';
  hub = await client.createResource('/hubs', hub, Hub);
  t.is(hub.id, 'hub 1');
});

test('createLinkedResource should follow href', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock.onPost('/hubs').reply(200, {
    id: 'hub 1',
    name: 'hub 1'
  });

  let hub = new Hub();
  hub.name = 'hub 1';
  hub = await client.createLinkedResource({ href: '/hubs' }, {}, hub, Hub);
  t.is(hub.id, 'hub 1');
});

test('createLinkedResource should process templated links', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock.onPost('/hubs/1/content-repositories').reply(200, {
    id: 'repo 1',
    name: 'repo 1'
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

test('requests should include auth token', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token'
    })
    .reply(200, {
      name: 'hub 1'
    });

  const hub = await client.fetchResource('/hubs/1', Hub);
  t.is(hub.name, 'hub 1');
});

test('should ask for token from provider every request', async t => {
  let tokenCount = 0;
  const client = new HalClient(
    () => Promise.resolve('token' + tokenCount++),
    {}
  );

  const mock = new MockAdapter(client.client);
  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token0'
    })
    .reply(200, {
      name: 'hub 1'
    });
  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token1'
    })
    .reply(200, {
      name: 'hub 1'
    });

  const hub = await client.fetchResource('/hubs/1', Hub);
  const hub2 = await client.fetchResource('/hubs/1', Hub);
  t.is(hub2.name, 'hub 1');
});

test('parse should instantiate and parse the resource', t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const hub = client.parse({ name: 'hub' }, Hub);
  t.is(hub.name, 'hub');
});

test('serialize should make a copy of the object', t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const hub = new Hub();
  hub.name = 'hub';
  const hubJson = client.serialize(hub);

  t.not(hub, hubJson);
  t.is(hubJson.name, 'hub');
});

test('api errors should be surfaced in the rejection error', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token'
    })
    .reply(403, {
      errors: [{ message: 'Authorization Required' }]
    });

  await t.throws(
    () => client.fetchResource('/hubs/1', Hub),
    'Request failed with status code 403: {"errors":[{"message":"Authorization Required"}]}'
  );
});

test('unknown errors should describe the status code', async t => {
  const client = new HalClient(() => Promise.resolve('token'), {});
  const mock = new MockAdapter(client.client);

  mock
    .onGet('/hubs/1', undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'bearer token'
    })
    .reply(403, {
      errors: [{ message: 'Authorization Required' }]
    });

  await t.throws(
    () => client.fetchResource('/hubs/1', Hub),
    'Request failed with status code 403: {"errors":[{"message":"Authorization Required"}]}'
  );
});
