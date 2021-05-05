import test from 'ava';
import { DynamicContent } from '../DynamicContent';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { initJsonServer } from '../utils/json-server/server';
import { Webhook } from './Webhook';

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
  const webhook = new Webhook();
  webhook.active = true;
  webhook.label = 'Unit Test';
  webhook.handlers = ['http://example.com/webhook'];
  webhook.method = 'POST';
  webhook.events = ['dynamic-content.content-item.created'];
  webhook.filters = [
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
  ];
  webhook.headers = [
    {
      key: 'X-Secret',
      value: 'abc123',
      secret: true,
    },
    {
      key: 'X-Header',
      value: 'abc123',
    },
  ];
  webhook.customPayload = {
    type: 'text/x-handlebars-template',
    value:
      '{{#withDeliveryContentItem contentItemId=payload.id account="myAccountId" stagingEnvironment="myVseUrl"}}{{{JSONstringify this}}}{{/withDeliveryContentItem}}',
  };
  webhook.secret = 'SECRET';
  const newWebhook = await hub.related.webhooks.create(webhook);
  const postRequests = client.mock.history['post'];
  const createWebhook = postRequests[postRequests.length - 1];
  // validate the request
  const jsonBody = JSON.parse(createWebhook.data);
  t.is(jsonBody.active, webhook.active);
  t.is(jsonBody.label, webhook.label);
  t.deepEqual(jsonBody.handlers, webhook.handlers);
  t.is(jsonBody.method, webhook.method);
  t.deepEqual(jsonBody.events, webhook.events);
  t.deepEqual(jsonBody.filters, webhook.filters);
  t.deepEqual(jsonBody.headers, webhook.headers);
  t.deepEqual(jsonBody.customPayload, webhook.customPayload);
  t.is(jsonBody.secret, webhook.secret);

  // validate the response
  t.is(newWebhook.active, webhook.active);
  t.is(newWebhook.label, webhook.label);
  t.deepEqual(newWebhook.handlers, webhook.handlers);
  t.is(newWebhook.method, webhook.method);
  t.deepEqual(newWebhook.events, webhook.events);
  t.deepEqual(newWebhook.filters, webhook.filters);
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
  t.deepEqual(newWebhook.customPayload, webhook.customPayload);
  t.is(newWebhook.secret, webhook.secret);
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

test('create webhook (end-to-end)', async (t) => {
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
  const webhook = new Webhook();
  webhook.active = true;
  webhook.label = 'Unit Test';
  webhook.handlers = ['http://example.com/webhook'];
  webhook.method = 'POST';
  webhook.events = ['dynamic-content.content-item.created'];
  webhook.filters = [
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
  ];
  webhook.headers = [
    {
      key: 'X-Secret',
      value: 'abc123',
      secret: true,
    },
    {
      key: 'X-Header',
      value: 'abc123',
    },
  ];
  webhook.customPayload = {
    type: 'text/x-handlebars-template',
    value:
      '{{#withDeliveryContentItem contentItemId=payload.id account="myAccountId" stagingEnvironment="myVseUrl"}}{{{JSONstringify this}}}{{/withDeliveryContentItem}}',
  };
  webhook.secret = 'SECRET';

  const newWebhook = await hub.related.webhooks.create(webhook);

  t.is(newWebhook.active, webhook.active);
  t.is(newWebhook.label, webhook.label);
  t.deepEqual(newWebhook.handlers, webhook.handlers);
  t.is(newWebhook.method, webhook.method);
  t.deepEqual(newWebhook.events, webhook.events);
  t.deepEqual(newWebhook.filters, webhook.filters);
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
  t.deepEqual(newWebhook.customPayload, webhook.customPayload);
  t.is(newWebhook.secret, webhook.secret);

  newWebhook.related.delete();

  console.log(jsonServer.router.db.get('webhooks').value());
  t.is(jsonServer.router.get('webhooks').length, 1);

  jsonServer.server.close();
});
