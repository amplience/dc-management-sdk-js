import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentItem } from './ContentItem';

test('get edition by id', async t => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  t.is(result.name, 'January Sale');
});

test('get event', async t => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  const event = await result.related.event();
  t.is(event.name, 'January Sale');
});

test('list slots', async t => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  const slots = await result.related.slots.list();

  t.is(slots.getItems()[0].slotId, '7aa5f5d4-071c-42e3-b42e-02675c56d60e');
});

test('toJson should copy resource attributes', async t => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');

  t.deepEqual(result.toJson(), {
    activeEndDate: false,
    comment: 'This is an example edition.',
    createdBy: 'user',
    createdDate: '2017-06-05T04:03:02.000Z',
    end: '2017-01-01T23:59:59.000Z',
    eventId: '5b32379e4cedfd01c4504171',
    id: '5b32379e4cedfd01c4504172',
    lastModifiedBy: 'user',
    lastModifiedDate: '2017-06-05T04:03:02.000Z',
    name: 'January Sale',
    publishingJobId: null,
    publishingStatus: 'DRAFT',
    schedulingErrors: null,
    schedulingUser: null,
    slotsRemaining: 200,
    stagedDate: null,
    start: '2017-01-01T00:00:00.000Z',
    statusUpdated: '2018-06-26T12:54:54.922Z'
  });
});
