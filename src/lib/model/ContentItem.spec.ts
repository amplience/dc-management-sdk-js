import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';

test('get content item by id', async t => {
  const client = new MockDynamicContent();
  const result = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  t.is(result.label, 'Banner Ad Homepage');
});

test('get version', async t => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  const version1 = await contentItem.related.contentItemVersion(1);

  t.is(version1.version, 1);
});

test('get repository', async t => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  const repo = await contentItem.related.contentRepository();

  t.is(repo.name, 'inspiration');
});

test('set locale', async t => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );

  const itemWithLocale = await contentItem.related.setLocale('en-GB');
  t.is(itemWithLocale.locale, 'en-GB');
});
