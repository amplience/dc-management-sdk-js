import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { CreateDeepSyncJobRequest } from './Job';

test('list jobs', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const jobs = await hub.related.jobs.list();
  t.is(jobs.getItems()[0].label, 'Valid sync job');
});

test('create job', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const request = new CreateDeepSyncJobRequest({
    label: 'Valid sync job',
    destinationHubId: '9a22ec72-86ec-4968-9abb-6a191dab3feb',
    input: {
      rootContentItemIds: ['a87fd535-fb25-44ee-b687-0db72bbab721'],
    },
    ignoreSchemaValidation: false,
  });
  const createdJob = await hub.related.jobs.createDeepSyncJob(request);

  t.is(createdJob.jobId, '689b6f1576dc233601467b5f');
});

test('get job', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const job = await hub.related.jobs.get('689b6f1576dc233601467b5f');
  t.is(job.label, 'Valid sync job');
});
