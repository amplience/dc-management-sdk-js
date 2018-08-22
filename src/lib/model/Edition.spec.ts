import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentItem } from './ContentItem';

test('get edition by id', async t => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  t.is(result.name, 'January Sale');
});

test('get event', async t => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  const event = await result.related.event();
  t.is(event.name, 'January Sale');
});

test('list slots', async t => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  const slots = await result.related.slots.list();

  t.is(slots.getItems()[0].slotId, '7aa5f5d4-071c-42e3-b42e-02675c56d60e');
});
