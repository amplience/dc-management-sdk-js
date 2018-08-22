import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { Edition } from './Edition';

test('get event by id', async t => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');
  t.is(result.name, 'January Sale');
});

test('list editions', async t => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');
  const editions = await result.related.editions.list();
  t.is(editions.getItems()[0].name, 'January Sale');
});

test('create edition', async t => {
  const client = new MockDynamicContent();
  const result = await client.events.get('5b32379e4cedfd01c4504171');
  const newEdition = await result.related.editions.create(new Edition());

  t.is(newEdition.name, 'January Sale');
});
