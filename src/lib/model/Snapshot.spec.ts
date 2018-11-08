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

test('toJson should copy resource attributes', async t => {
  const client = new MockDynamicContent();
  const snapshot = await client.snapshots.get('5b3237944cedfd01c45038ae');

  t.deepEqual(snapshot.toJson(), {
    comment: 'This is an example snapshot.',
    createdBy: 'thor',
    createdDate: '2017-06-05T04:03:02Z',
    id: '5b3237944cedfd01c45038ae',
    meta: [],
    rootContentItem: {
      contentTypeUri:
        'http://deliver.bigcontent.io/schema/nested/nested-type.json',
      label: 'Banner Ad Homepage'
    },
    taggedEditions: [],
    type: 'USER'
  });
});
