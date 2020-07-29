import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';

test('get assigned content type by id', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.assignedContentTypes.get(
    '00112233445566778899aabb'
  );
  t.is(
    result.contentTypeUri,
    'http://deliver.bigcontent.io/schema/banner-type.json'
  );
});

test('delete an assigned content type search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.assignedContentTypes.get(
    '00112233445566778899aabb'
  );
  return t.notThrowsAsync(result.related.unassign('00112233445566778899aabb'));
});

test('recreate webhook for an assigned content type', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.assignedContentTypes.get(
    '00112233445566778899aabb'
  );
  return t.notThrowsAsync(result.related.recreateWebhook());
});
