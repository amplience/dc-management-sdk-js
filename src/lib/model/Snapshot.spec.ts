import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';

test('get snapshot by id', async t => {
  const client = new MockDynamicContent();
  const result = await client.snapshots.get('5b3237944cedfd01c45038ae');
  t.is(result.comment, 'This is an example snapshot.');
});

test('get content item from snapshot', async t => {
  const client = new MockDynamicContent();
  const snapshot = await client.snapshots.get('5b3237944cedfd01c45038ae');
  const result = await snapshot.related.snapshotContentItem(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );

  t.is(result.label, 'Banner Ad Homepage');
});
