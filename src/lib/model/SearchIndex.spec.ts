import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { AssignedContentType } from './AssignedContentType';
import { SearchIndex } from './SearchIndex';
import { SearchesOrderBy } from './SearchIndexTopSearches';

test('get search index by id', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  t.is(result.label, 'My Index');
});

test('create a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.create(new SearchIndex());
  t.is(result.label, 'My Index');
});

test('clear a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  return t.notThrowsAsync(result.related.clear());
});

test('delete a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  return t.notThrowsAsync(result.related.delete());
});

test('get api key for search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.keys.get();
  t.is(result.key, 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz');
});

test('get stats for a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.stats.get();
  t.is(result.totalRecords, 4);
  t.is(result.usage.averageResponseTime.value, 1.25);
  t.is(result.usage.numberOfSearches.value, 150);
});

test('list search indexes', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.list();
  t.is(result.getItems()[0].label, 'My Index');
});

test('list search index replicas', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.replicas.list();
  t.is(result.getItems()[0].label, 'replica one');
});

test('update a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  result.label = 'Updated Label';
  const updatedSearchIndex = await result.related.update(result);
  t.is(updatedSearchIndex.label, 'Updated Label');
});

test('create an assigned content type', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.assignedContentTypes.create(
    new AssignedContentType()
  );
  t.is(result.id, '00112233445566778899aabb');
});

test('list assigned content types', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.assignedContentTypes.list();
  t.is(result.getItems()[0].id, '00112233445566778899aabb');
});

test('get settings for a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related.settings.get();
  t.is(result.replicas[0], 'replica one');
});

test('update search index settings', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const searchIndexSettings = await searchIndex.related.settings.get();
  searchIndexSettings.hitsPerPage = 25;
  const result = await searchIndex.related.settings.update(searchIndexSettings);
  t.is(result.hitsPerPage, 25);
  t.is(result.replicas[0], 'replica one');
});

test('delete an index object', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  return t.notThrowsAsync(
    result.related.indexObject.delete('00112233445566778899aabz')
  );
});

test('get top-results analytics for a search index should default to clickAnalytics=false', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related['top-searches'].get({});
  const item = result.getItems()[0];
  t.is(item.search, 'q0');
  t.is(item.nbHits, 1);
  t.is(item.count, 1);
  const getRequests = client.mock.history['get'];
  const query = getRequests[getRequests.length - 1].url.split('?')[1];
  t.is(query, 'clickAnalytics=false');
});

test('get top-results analytics for a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related['top-searches'].get({
    clickAnalytics: true,
    direction: 'asc',
    endDate: '2020-12-31',
    startDate: '2020-01-01',
    includeReplicas: true,
    limit: 10,
    offset: 20,
    orderBy: SearchesOrderBy.SEARCH_COUNT,
    tags: 'additional_tags',
  });
  const item = result.getItems()[0];
  t.is(item.search, 'q0');
  t.is(item.nbHits, 1);
  t.is(item.count, 1);
});

test('get top-hits analytics for a search index with no search term', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related['top-hits'].get({
    endDate: '2020-12-31',
    startDate: '2020-01-01',
    includeReplicas: true,
    limit: 10,
    offset: 20,
    tags: 'additional_tags',
  });
  const item = result.getItems()[0];
  t.is(item.count, 123);
  t.is(item.hit, 'ObjectID');
});

test('get top-hits analytics for a search index for a search term', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related['top-hits'].get({
    search: 'term',
    endDate: '2020-12-31',
    startDate: '2020-01-01',
    includeReplicas: true,
    limit: 10,
    offset: 20,
    tags: 'additional_tags',
  });
  const item = result.getItems()[0];
  t.is(item.count, 123);
  t.is(item.hit, 'ObjectID');
});

test('get searches-with-no-results analytics for a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related['searches-with-no-results'].get({
    endDate: '2020-12-31',
    startDate: '2020-01-01',
    includeReplicas: true,
    limit: 10,
    offset: 20,
    tags: 'additional_tags',
  });
  const item = result.getItems()[0];
  t.is(item.count, 3);
  t.is(item.search, 'q0');
  t.is(item.withFilterCount, 10);
});

test('get top-filters-no-result-search analytics for a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related['top-filters-no-result-search'].get({
    search: 'q0',
    endDate: '2020-12-31',
    startDate: '2020-01-01',
    includeReplicas: true,
    limit: 10,
    offset: 20,
    tags: 'additional_tags',
  });
  const item = result.getItems()[0];
  t.is(item.count, 3);
  t.deepEqual(item.values, [
    {
      attribute: 'brand',
      operator: ':',
      value: 'apple',
    },
  ]);
});

test('get user count analytics for a search index', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const searchIndex = await hub.related.searchIndexes.get(
    '00112233445566778899aabb'
  );
  const result = await searchIndex.related['users-count'].get({
    endDate: '2020-08-01',
    startDate: '2020-08-01',
    includeReplicas: true,
    tags: 'additional_tags',
  });
  t.is(result.count, 1);
  t.is(result.dates[0].count, 1);
  t.is(result.dates[0].date, '2020-08-01');
});
