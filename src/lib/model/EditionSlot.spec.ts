import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';

test('update content', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');

  const slots = await result.related.slots.list();
  const slot = slots.getItems()[0];

  const updated = await slot.related.content({
    updated: 'content',
  });

  t.is(updated.content.updated, 'content');
});
