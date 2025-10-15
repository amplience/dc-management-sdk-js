import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { PublishingJobStatus } from './PublishingJobStatus';

test('get a publishing job by id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.publishingJob.get('68a83ba875c14d19c73219b6');

  t.is(result.state, PublishingJobStatus.PUBLISHING);
});

test('cancel a publishing job', async (t) => {
  const client = new MockDynamicContent();
  const publishingJob = await client.publishingJob.get(
    '68a83ba875c14d19c73219b6'
  );

  const update = await publishingJob.related.cancel();
  t.is(update.state, PublishingJobStatus.CANCELLED);
});
