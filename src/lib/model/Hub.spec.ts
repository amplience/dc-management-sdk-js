import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { Event } from './Event';

test('list hubs', async t => {
  const client = new MockDynamicContent();
  const result = await client.hubs.list();
  t.is(result.getItems()[0].name, 'anya-finn');
});

test('get hub by id', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  t.is(hub.name, 'anya-finn');
});

test('list content repositories', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentRepositories.list();
  t.is(result.getItems()[0].name, 'inspiration');
});

test('list events', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.events.list();
  t.is(result.getItems()[0].name, 'January Sale');
});

test('create event', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.events.create(new Event());
  t.is(result.name, 'January Sale');
});
