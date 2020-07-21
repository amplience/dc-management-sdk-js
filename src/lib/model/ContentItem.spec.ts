import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentItem } from './ContentItem';

test('get content item by id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  t.is(result.label, 'Banner Ad Homepage');
});

test('get version', async (t) => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  const version1 = await contentItem.related.contentItemVersion(1);

  t.is(version1.version, 1);
});

test('update', async (t) => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );

  const mutation = new ContentItem({
    label: 'New Label',
    version: contentItem.version,
  });

  const update = await contentItem.related.update(mutation);
  t.is(update.version, contentItem.version + 1);
});

test('get repository', async (t) => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  const repo = await contentItem.related.contentRepository();

  t.is(repo.name, 'inspiration');
});

test('set locale', async (t) => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );

  const itemWithLocale = await contentItem.related.setLocale('en-GB');
  t.is(itemWithLocale.locale, 'en-GB');
});

test('create localizations', async (t) => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );

  const itemWithLocale = await contentItem.related.setLocale('en-GB');

  const localizationJob = await itemWithLocale.related.localize(['fr-FR']);

  t.is(localizationJob.status, 'IN_PROGRESS');
});

test('content item with assignees', async (t) => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab722'
  );

  t.deepEqual(contentItem.assignees, ['28cf43f6-7521-41c8-9892-8716adcc1e4f']);
});

test('toJSON should copy resource attributes', async (t) => {
  const client = new MockDynamicContent();
  const resource = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  t.deepEqual(resource.toJSON(), {
    body: {
      _meta: {
        name: 'main-banner',
        schema: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
      },
    },
    createdBy: 'user',
    createdDate: '2018-06-26T12:54:16.216Z',
    deliveryId: 'a87fd535-fb25-44ee-b687-0db72bbab721',
    folderId: '5b3237784cedfd01c4503658',
    id: 'a87fd535-fb25-44ee-b687-0db72bbab721',
    label: 'Banner Ad Homepage',
    lastModifiedBy: 'user',
    lastModifiedDate: '2018-06-26T12:54:16.216Z',
    locale: 'en-GB',
    status: 'ACTIVE',
    version: 1,
  });
});
