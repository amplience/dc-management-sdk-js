import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { LinkedContentRepository } from './LinkedContentRepository';

test('list linked content repositories', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const repos = await hub.related.linkedContentRepositories.list();

  t.is(repos.getItems()[0].originHubLabel, 'Origin hub');
});

test('create linked content repositories', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const repo = new LinkedContentRepository({
    originHubId: '6796aab8-62b3-46e8-9008-3c37eb0a55da',
    hubIds: [
      '6796aab8-62b3-46e8-9008-3c37eb0a55da',
      '9a22ec72-86ec-4968-9abb-6a191dab3feb',
    ],
    bidirectional: true,
    relationships: [
      {
        originRepositoryId: 'b3e9d885-308b-4325-8678-c9e7e715cef3',
        originRepositoryLabel: 'Origin repo label',
        dstRepositoryId: '39a528c0-b0c2-4cd8-a5de-f29338adee1e',
        dstRepositoryLabel: 'Dest repo label',
      },
    ],
  });

  const repos = await hub.related.linkedContentRepositories.create(repo);

  t.is(repos.originHubLabel, 'Origin hub');
});

test('update linked content repositories', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const repo = new LinkedContentRepository({
    originHubId: '6796aab8-62b3-46e8-9008-3c37eb0a55da',
    hubIds: [
      '6796aab8-62b3-46e8-9008-3c37eb0a55da',
      '9a22ec72-86ec-4968-9abb-6a191dab3feb',
    ],
    bidirectional: true,
    relationships: [
      {
        originRepositoryId: 'b3e9d885-308b-4325-8678-c9e7e715cef3',
        originRepositoryLabel: 'Origin repo label',
        dstRepositoryId: '39a528c0-b0c2-4cd8-a5de-f29338adee1e',
        dstRepositoryLabel: 'Dest repo label',
      },
    ],
  });

  const repos = await hub.related.linkedContentRepositories.update(repo);

  t.is(repos.originHubLabel, 'Origin hub');
});

test('delete linked content repositories', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const repo = new LinkedContentRepository({
    originHubId: '6796aab8-62b3-46e8-9008-3c37eb0a55da',
    hubIds: [
      '6796aab8-62b3-46e8-9008-3c37eb0a55da',
      '9a22ec72-86ec-4968-9abb-6a191dab3feb',
    ],
    bidirectional: true,
    relationships: [],
  });

  const repos = await hub.related.linkedContentRepositories.delete(repo);

  t.is(repos.originHubLabel, 'Origin hub');
});
