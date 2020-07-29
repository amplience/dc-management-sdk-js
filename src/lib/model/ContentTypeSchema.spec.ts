import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentTypeSchema } from './ContentTypeSchema';

test('list ContentTypeSchemas for a Hub', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentTypeSchema.list();
  t.is(
    result.getItems()[0].schemaId,
    'http://example.com/content-type-schema.json'
  );
});

test('get a ContentTypeSchema', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.contentTypeSchemas.get(
    '5d4af55ced6688002869d808'
  );
  t.is(result.schemaId, 'http://example.com/content-type-schema.json');
});

test('get a version ContentTypeSchema', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.contentTypeSchemas.getByVersion(
    '5d4af55ced6688002869d808',
    2
  );
  t.is(result.schemaId, 'http://example.com/content-type-schema.json');
});

test('create a ContentTypeSchema', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const newContentTypeSchema = new ContentTypeSchema();
  newContentTypeSchema.schemaId = 'http://example.com/content-type-schema.json';
  newContentTypeSchema.body = JSON.stringify({
    $schema: 'http://json-schema.org/draft-04/schema#',
    id: 'http://example.com/content-type-schema.json',
    title: 'Image',
  });
  const createContentTypeSchema = await hub.related.contentTypeSchema.create(
    newContentTypeSchema
  );
  t.is(
    createContentTypeSchema.schemaId,
    'http://example.com/content-type-schema.json'
  );
});

test('update a ContentTypeSchema', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.contentTypeSchemas.get(
    '5d4af55ced6688002869d808'
  );
  const createContentTypeSchema = await result.related.update(result);
  t.is(createContentTypeSchema.version, 2);
});

test('archive a ContentTypeSchema', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.contentTypeSchemas.get(
    '5d4af55ced6688002869d808'
  );
  const archiveContentTypeSchema = await result.related.archive();
  t.is(
    archiveContentTypeSchema.schemaId,
    'http://example.com/content-type-schema.json'
  );
});

test('unarchive a ContentTypeSchema', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.contentTypeSchemas.get(
    '5d4af55ced6688002869d808'
  );
  const unarchiveContentTypeSchema = await result.related.unarchive();
  t.is(
    unarchiveContentTypeSchema.schemaId,
    'http://example.com/content-type-schema.json'
  );
});
