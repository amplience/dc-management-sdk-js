import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';

test('get fby Root Content Item', async (t) => {
  const client = new MockDynamicContent();

  const contentItem = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );

  const itemWithLocale = await contentItem.related.setLocale('en-GB');

  const localizationJob = await itemWithLocale.related.localize(['fr-FR']);

  t.is(localizationJob.status, 'IN_PROGRESS');

  const localizationJobStatuses = await localizationJob.related.findByRootContentItem();

  t.is(
    localizationJobStatuses.getItems()[0].rootContentItem.id,
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
});
