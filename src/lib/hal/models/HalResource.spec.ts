import test from 'ava';
import { AxiosHalClient, HalClient } from '../services/HalClient';
import { HalResource } from './HalResource';

// axios-mock-adaptor's typedefs are wrong preventing calling onGet with 3 args, this is a workaround
/**
 * @hidden
 */
// tslint:disable-next-line
const MockAdapter = require('axios-mock-adapter');

const tokenProvider = {
  getToken: () =>
    Promise.resolve({
      access_token: 'token',
      expires_in: 500,
      refresh_token: 'refresh'
    })
};

/**
 * @hidden
 */
class MockResource extends HalResource {
  public name?: string;

  public readonly embedded = {
    mocks: this.parseEmbedded.bind(this, 'mocks', MockResource)
  };

  public readonly related = {
    nested: () => this.fetchLinkedResource('nested', {}, MockResource),
    nestedCreate: (resource: MockResource) =>
      this.createLinkedResource('nested', {}, resource, MockResource)
  };
}

test('embedded resources should be lazy parsed', t => {
  const client = new AxiosHalClient(tokenProvider, {});
  const resource = client.parse(
    {
      _embedded: {
        mocks: [{ name: 'test' }]
      }
    },
    MockResource
  );

  t.is(resource.embedded.mocks().length, 1);
  t.is(resource.embedded.mocks()[0].name, 'test');
});

test('missing embedded resources should return an empty list', t => {
  const resource = new MockResource({
    _embedded: {}
  });
  t.is(resource.embedded.mocks().length, 0);
});

test('input JSON should be parsed', async t => {
  const resource = new MockResource({
    name: 'test'
  });
  t.is(resource.name, 'test');
});

test('fetchLinkedResource should follow the resource link', async t => {
  const client = new AxiosHalClient(tokenProvider, {});
  const mock = new MockAdapter(client.client);

  const resource = client.parse(
    {
      _links: {
        nested: {
          href: '/nested/1'
        }
      }
    },
    MockResource
  );

  mock.onGet('/nested/1', undefined).reply(200, {
    name: 'nested 1'
  });

  const result = await resource.related.nested();
  t.is(result.name, 'nested 1');
});

test('fetchLinkedResource should return null if link is missing', async t => {
  const client = new AxiosHalClient(tokenProvider, {});

  const resource = client.parse(
    {
      _links: {}
    },
    MockResource
  );

  const result = await resource.related.nested();
  t.is(result, null);
});

test('fetchLinkedResource should reject if no client is linked', async t => {
  const client = new AxiosHalClient(tokenProvider, {});
  const resource = new MockResource({
    _links: {}
  });

  resource.related.nested().then(() => t.fail(), () => t.pass());
});

test('createLinkedResource should follow the resource link', async t => {
  const client = new AxiosHalClient(tokenProvider, {});
  const mock = new MockAdapter(client.client);

  const resource = client.parse(
    {
      _links: {
        nested: {
          href: '/nested/1'
        }
      }
    },
    MockResource
  );

  mock.onPost('/nested/1', undefined).reply(200, {
    name: 'nested 1'
  });

  const result = await resource.related.nestedCreate(resource);
  t.is(result.name, 'nested 1');
});

test('createLinkedResource should return null if link is missing', async t => {
  const client = new AxiosHalClient(tokenProvider, {});

  const resource = client.parse(
    {
      _links: {}
    },
    MockResource
  );

  const result = await resource.related.nestedCreate(resource);
  t.is(result, null);
});

test('createLinkedResource should reject if no client is linked', async t => {
  const client = new AxiosHalClient(tokenProvider, {});
  const resource = new MockResource({
    _links: {}
  });

  resource.related.nestedCreate(resource).then(() => t.fail(), () => t.pass());
});
