import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentItem } from './ContentItem';
import { Folder } from './Folder';

test('get content repository by id', async t => {
  const client = new MockDynamicContent();

  const result = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );
  t.is(result.name, 'inspiration');
});

test('create content item', async t => {
  const client = new MockDynamicContent();

  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );
  const newContentItem = new ContentItem();
  newContentItem.label = 'Banner Ad Homepage';
  const createdContentItem = await contentRepository.related.contentItems.create(
    newContentItem
  );
  t.is(createdContentItem.label, 'Banner Ad Homepage');
});

test('list content items', async t => {
  const client = new MockDynamicContent();

  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );

  const result = await contentRepository.related.contentItems.list();
  t.is(result.getItems()[0].label, 'Banner Ad Homepage');
});

test('list repository top-level folders', async t => {
  const client = new MockDynamicContent();
  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );

  const folders = await contentRepository.related.folders.list();

  t.is(folders.getItems()[0].name, 'A folder to end all folders');
});

test('create top-level folder in content repository', async t => {
  const client = new MockDynamicContent();
  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );

  const newFolder = await contentRepository.related.folders.create(
    new Folder({
      name: 'Another Folder'
    })
  );

  t.is(newFolder.name, 'Another Folder');
});

test('toJSON should copy resource attributes', async t => {
  const client = new MockDynamicContent();
  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );

  t.deepEqual(contentRepository.toJSON(), {
    contentTypes: [],
    features: [],
    id: '5b32377b4cedfd01c4503691',
    itemLocales: ['en', 'fr'],
    label: 'Inspiration',
    name: 'inspiration',
    status: 'ACTIVE',
    type: 'CONTENT'
  });
});

test('assign content type', async t => {
  const client = new MockDynamicContent();
  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );

  const result = await contentRepository.related.contentTypes.assign(
    '5be1d5134cedfd01c030c460'
  );
  t.is(result.id, '5b32377b4cedfd01c4503691');
});

test('unassign content type', async t => {
  const client = new MockDynamicContent();
  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );

  const result = await contentRepository.related.contentTypes.unassign(
    '5be1d5134cedfd01c030c460'
  );
  t.pass();
});
