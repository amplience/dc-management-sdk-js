import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentItem } from './ContentItem';

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
