import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { Edition } from './Edition';
import { Event } from './Event';

test('get event by id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');
  t.is(result.name, 'January Sale');
});

test('list editions', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');
  const editions = await result.related.editions.list();
  t.is(editions.getItems()[0].name, 'January Sale');
});

test('archive event', async (t) => {
  const client = new MockDynamicContent();
  const event = await client.events.get('5b32379e4cedfd01c4504171');
  const result = await event.related.archive();
  t.is(result.id, '5b32379e4cedfd01c4504171');
});

test('update event', async (t) => {
  const client = new MockDynamicContent();
  const event = await client.events.get('5b32379e4cedfd01c4504171');

  const mutation = new Event({
    comment: 'updated',
  });

  const update = await event.related.update(mutation);
  t.is(update.comment, mutation.comment);
});

test('delete event', async (t) => {
  const client = new MockDynamicContent();
  const event = await client.events.get('5b32379e4cedfd01c4504171');
  const result = await event.related.delete();

  t.false(result !== undefined);
});

test('create edition', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');
  const newEdition = await result.related.editions.create(new Edition());

  t.is(newEdition.name, 'January Sale');
});

test('toJSON should copy resource attributes', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');

  t.deepEqual(result.toJSON(), {
    brief: 'http://external.doc/mybrief',
    comment: 'This is an event.',
    end: '2017-01-01T23:59:59.000Z',
    id: '5b32379e4cedfd01c4504171',
    name: 'January Sale',
    start: '2017-01-01T00:00:00.000Z',
  });
});

test('get hub', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');
  const hub = await result.related.hub();
  t.is(hub.name, 'anya-finn');
});
