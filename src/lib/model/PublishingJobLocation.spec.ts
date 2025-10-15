import test from 'ava';
import { MockDynamicContent, PUBLISHING_JOB } from '../DynamicContent.mocks';

test('get publishing job', async (t) => {
  const client = new MockDynamicContent();
  client.mock
    .onGet(
      'https://api.amplience.net/v2/content/publishing-jobs/68a83ba875c14d19c73219b6'
    )
    .reply(200, PUBLISHING_JOB);

  const result = await client.contentItems.get(
    'a87fd535-fb25-44ee-b687-0db72bbab721'
  );
  const publishingJobLocation = await result.related.publish();
  const publishingJob = await publishingJobLocation.related.publishingJob();

  t.is(publishingJob.id, '68a83ba875c14d19c73219b6');
});
