import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { SearchIndex } from './SearchIndex';

test('get search index by id', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  t.is(result.label, 'My Index');
});

test('create a search index', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.create(new SearchIndex());
  t.is(result.label, 'My Index');
});

test('clear a search index', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  return t.notThrows(result.related.clear());
});

test('delete a search index', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  return t.notThrows(result.related.delete());
});

test('get api key for search index', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.keys.get();
  t.is(result.key, 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz');
});

test('list search indexes', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.list();
  t.is(result.getItems()[0].label, 'My Index');
});

test('update a search index', async t => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  result.label = 'Updated Label';
  const updatedSearchIndex = await result.related.update(result);
  t.is(updatedSearchIndex.label, 'Updated Label');
});
