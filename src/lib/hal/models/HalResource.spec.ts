import test from 'ava';
import { AxiosHttpClient } from '../../http/AxiosHttpClient';
import { DefaultHalClient, HalClient } from '../services/HalClient';
import { HalResource } from './HalResource';

// axios-mock-adaptor's typedefs are wrong preventing calling onGet with 3 args, this is a workaround
/**
 * @hidden
 */
// tslint:disable-next-line
const MockAdapter = require('axios-mock-adapter');

/**
 * @hidden
 */
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
function createMockClient(): [HalClient, any] {
  const httpClient = new AxiosHttpClient({});
  const client = new DefaultHalClient('', httpClient, tokenProvider);
  const mock = new MockAdapter(httpClient.client);

  return [client, mock];
}

/**
 * @hidden
 */
class MockResource extends HalResource {
  public name?: string;

  public readonly related = {
    nested: () => this.fetchLinkedResource('nested', {}, MockResource),
    nestedCreate: (resource: MockResource) =>
      this.createLinkedResource('nested', {}, resource, MockResource)
  };

  public getMockEmbeddedResources(): MockResource[] {
    return this.parseEmbedded('mocks', MockResource);
  }
}

test('embedded resources should be lazy parsed', t => {
  const [client, mock] = createMockClient();

  const resource = client.parse(
    {
      _embedded: {
        mocks: [{ name: 'test' }]
      }
    },
    MockResource
  );

  t.is(resource.getMockEmbeddedResources().length, 1);
  t.is(resource.getMockEmbeddedResources()[0].name, 'test');
});

test('missing embedded resources should return an empty list', t => {
  const resource = new MockResource({
    _embedded: {}
  });
  t.is(resource.getMockEmbeddedResources().length, 0);
});

test('input JSON should be parsed', async t => {
  const resource = new MockResource({
    name: 'test'
  });
  t.is(resource.name, 'test');
});

test('fetchLinkedResource should follow the resource link', async t => {
  const [client, mock] = createMockClient();

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

test('fetchLinkedResource should reject if link is missing', async t => {
  const [client, mock] = createMockClient();

  const resource = client.parse(
    {
      _links: {}
    },
    MockResource
  );

  resource.related.nested().then(() => t.fail(), () => t.pass());
});

test('fetchLinkedResource should reject if no client is linked', async t => {
  const [client, mock] = createMockClient();
  const resource = new MockResource({
    _links: {}
  });

  resource.related.nested().then(() => t.fail(), () => t.pass());
});

test('createLinkedResource should follow the resource link', async t => {
  const [client, mock] = createMockClient();

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

test('createLinkedResource should reject if link is missing', async t => {
  const [client, mock] = createMockClient();

  const resource = client.parse(
    {
      _links: {}
    },
    MockResource
  );

  resource.related.nestedCreate(resource).then(() => t.fail(), () => t.pass());
});

test('createLinkedResource should reject if no client is linked', async t => {
  const [client, mock] = createMockClient();
  const resource = new MockResource({
    _links: {}
  });

  resource.related.nestedCreate(resource).then(() => t.fail(), () => t.pass());
});

test('toJSON should copy resource attributes', async t => {
  const resource = new MockResource({
    _links: {},
    name: 'name'
  });
  const json = resource.toJSON();
  t.is(json.name, 'name');
});

test('toJSON should exclude links & related', async t => {
  const resource = new MockResource({
    _links: {
      nested: {
        href: '/nested/1'
      }
    },
    name: 'name'
  });
  const json = resource.toJSON();
  t.deepEqual(json, { name: 'name' });
});
