import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { PublishingJobStatus } from './PublishingStatus';
import { PublishingJob } from './PublishingJob';

test('get a publishing job by id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.publishingJob.get('68a83ba875c14d19c73219b6');

  t.is(result.state, PublishingJobStatus.PUBLISHING);
});

test('cancel a publishing job by id', async (t) => {
  const client = new MockDynamicContent();
  const publishingJob = await client.publishingJob.get(
    '68a83ba875c14d19c73219b6'
  );

  const mutation = new PublishingJob({
    state: PublishingJobStatus.CANCELLED,
  });

  const update = await publishingJob.related.cancel(mutation);
  t.is(update.state, mutation.state);
});
