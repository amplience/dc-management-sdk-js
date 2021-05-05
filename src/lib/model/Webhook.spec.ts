import test from 'ava';
import { DynamicContent } from '../DynamicContent';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { initJsonServer } from '../utils/json-server/server';
import { Webhook } from './Webhook';

const FIXTURE_WEBHOOK_WITH_EXTRA_PROPS = new Webhook({
  active: true,
  label: 'Unit Test',
  handlers: ['http://example.com/webhook'],
  method: 'POST',
  events: ['dynamic-content.content-item.created'],
  filters: [
    {
      type: 'equal',
      arguments: [
        {
          jsonPath: '$.payload.id',
        },
        {
          value: 'abc',
        },
      ],
    },
    {
      type: 'in',
      arguments: [
        {
          jsonPath: '$.payload.id',
        },
        {
          value: ['abc', 'def'],
        },
      ],
    },
    {
      type: 'equal',
      arguments: [
        {
          jsonPath: '$.payload.not_present',
        },
        {
          value: '123',
        },
      ],
    },
  ],
  headers: [
    {
      key: 'X-Secret',
      value: 'abc123',
      secret: true,
    },
    {
      key: 'X-Header',
      value: 'abc123',
    },
  ],
  customPayload: {
    type: 'text/x-handlebars-template',
    value:
      '{{#withDeliveryContentItem contentItemId=payload.id account="myAccountId" stagingEnvironment="myVseUrl"}}{{{JSONstringify this}}}{{/withDeliveryContentItem}}',
  },
  secret: 'SECRET',
});

test('get webhook by id', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.webhooks.get('5a497a000000000000000000');
  t.is(result.label, 'myWebhookSubscription');
});

test('list webhooks', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const webhooks = await hub.related.webhooks.list();
  t.is(webhooks.getItems()[0].label, 'myWebhookSubscription');
});

test('create webhook', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');

  const newWebhook = await hub.related.webhooks.create(
    FIXTURE_WEBHOOK_WITH_EXTRA_PROPS
  );

  const postRequests = client.mock.history['post'];
  const createWebhook = postRequests[postRequests.length - 1];

  // validate the request
  const jsonBody = JSON.parse(createWebhook.data);
  t.is(jsonBody.active, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.active);
  t.is(jsonBody.label, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.label);
  t.deepEqual(jsonBody.handlers, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.handlers);
  t.is(jsonBody.method, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.method);
  t.deepEqual(jsonBody.events, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.events);
  t.deepEqual(jsonBody.filters, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.filters);
  t.deepEqual(jsonBody.headers, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.headers);
  t.deepEqual(
    jsonBody.customPayload,
    FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.customPayload
  );
  t.is(jsonBody.secret, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.secret);

  // validate the response
  t.is(newWebhook.active, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.active);
  t.is(newWebhook.label, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.label);
  t.deepEqual(newWebhook.handlers, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.handlers);
  t.is(newWebhook.method, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.method);
  t.deepEqual(newWebhook.events, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.events);
  t.deepEqual(newWebhook.filters, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.filters);
  t.deepEqual(newWebhook.headers, [
    {
      key: 'X-Secret',
      value: null, // value will be null a secret = true
      secret: true,
    },
    {
      key: 'X-Header',
      value: 'abc123',
      secret: false,
    },
  ]);
  t.deepEqual(
    newWebhook.customPayload,
    FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.customPayload
  );
  t.is(newWebhook.secret, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.secret);
});

test('update webhook', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const webhookList = await hub.related.webhooks.list();

  const updatedWebhook = await webhookList
    .getItems()[0] // 1st webhook
    .related.update(FIXTURE_WEBHOOK_WITH_EXTRA_PROPS);

  const patchRequests = client.mock.history['patch'];
  const updatedWebhookRequest = patchRequests[patchRequests.length - 1];

  // validate the request
  const jsonBody = JSON.parse(updatedWebhookRequest.data);
  t.is(jsonBody.active, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.active);
  t.is(jsonBody.label, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.label);
  t.deepEqual(jsonBody.handlers, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.handlers);
  t.is(jsonBody.method, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.method);
  t.deepEqual(jsonBody.events, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.events);
  t.deepEqual(jsonBody.filters, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.filters);
  t.deepEqual(jsonBody.headers, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.headers);
  t.deepEqual(
    jsonBody.customPayload,
    FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.customPayload
  );
  t.is(jsonBody.secret, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.secret);

  // validate the response
  t.is(updatedWebhook.active, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.active);
  t.is(updatedWebhook.label, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.label);
  t.deepEqual(
    updatedWebhook.handlers,
    FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.handlers
  );
  t.is(updatedWebhook.method, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.method);
  t.deepEqual(updatedWebhook.events, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.events);
  t.deepEqual(updatedWebhook.filters, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.filters);
  t.deepEqual(updatedWebhook.headers, [
    {
      key: 'X-Secret',
      value: null, // value will be null a secret = true
      secret: true,
    },
    {
      key: 'X-Header',
      value: 'abc123',
      secret: false,
    },
  ]);
  t.deepEqual(
    updatedWebhook.customPayload,
    FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.customPayload
  );
  t.is(updatedWebhook.secret, FIXTURE_WEBHOOK_WITH_EXTRA_PROPS.secret);
});

test('delete webhook', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.webhooks.get('5a497a000000000000000000');
  return t.notThrowsAsync(result.related.delete());
});

test('get hub', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.webhooks.get('5a497a000000000000000000');
  const followedHub = await result.related.hub();
  t.is(followedHub.name, 'anya-finn');
});

test('webhook (end-to-end)', async (t) => {
  const jsonServer = await initJsonServer(
    {
      hubs: [
        {
          id: '5b32377e4cedfd01c45036d8',
          _links: {
            'create-webhook': {
              href:
                'http://localhost:3000/hubs/5b32377e4cedfd01c45036d8/webhooks',
            },
            webhooks: {
              href:
                'http://localhost:3000/hubs/5b32377e4cedfd01c45036d8/webhooks',
            },
          },
        },
      ],
      webhooks: [],
    },
    [
      // strip secret headers
      (req, _res, next) => {
        if (req.path.match(/\/webhooks$/) && req.method == 'POST') {
          if (req.body.headers) {
            req.body.headers = req.body.headers.map((header) => {
              if (header.secret) {
                header.value = null;
              }
              return header;
            });
          }
        }
        next();
      },
    ]
  );
  const client = new DynamicContent(
    {
      client_id: 'CLIENT_ID',
      client_secret: 'CLIENT_SECRET',
    },
    jsonServer.dynamicContentClientConfig
  );
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  console.log(hub);
  // GET
  let webhooksList = (await hub.related.webhooks.list()).getItems();
  t.is(webhooksList.length, 0);

  // POST
  const createdWebhook = await hub.related.webhooks.create(
    FIXTURE_WEBHOOK_WITH_EXTRA_PROPS
  );
  webhooksList = (await hub.related.webhooks.list()).getItems();
  t.is(webhooksList.length, 1);

  // PATCH
  createdWebhook.related.update(new Webhook({ label: 'Updated' }));
  webhooksList = (await hub.related.webhooks.list()).getItems();
  t.is(webhooksList.length, 1);
  t.is(webhooksList[0].label, 'Updated');

  // DELETE
  createdWebhook.related.delete();
  webhooksList = (await hub.related.webhooks.list()).getItems();
  t.is(webhooksList.length, 0);

  jsonServer.server.close();
});
