import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
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
  const newWebhook = await hub.related.webhooks.create(new Webhook());

  t.is(newWebhook.label, 'myWebhookSubscription');
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
