import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { Job } from './Job';

test('list jobs', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const jobs = await hub.related.jobs.list();
  t.is(jobs.getItems()[0].label, 'Valid sync job');
});

test('create job', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const job = new Job({
    label: 'Valid sync job',
    jobType: 'sync',
    originHubId: '6796aab8-62b3-46e8-9008-3c37eb0a55da',
    destinationHubId: '9a22ec72-86ec-4968-9abb-6a191dab3feb',
    rootContentItemIDs: ['a87fd535-fb25-44ee-b687-0db72bbab721'],
  });
  const createdJob = await hub.related.jobs.createDeepSyncJob(job);
  t.is(createdJob.label, 'Valid sync job');
});

test('get job', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const job = await hub.related.jobs.get('689b6f1576dc233601467b5f');
  t.is(job.label, 'Valid sync job');
});
