import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { Edition } from './Edition';

test('get edition by id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  t.is(result.name, 'January Sale');
});

test('get event', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  const event = await result.related.event();
  t.is(event.name, 'January Sale');
});

test('archive edition', async (t) => {
  const client = new MockDynamicContent();
  const edition = await client.editions.get('5b32379e4cedfd01c4504172');
  const result = await edition.related.archive();
  t.is(result.id, '5b32379e4cedfd01c4504172');
});

test('unschedule edition', async (t) => {
  const client = new MockDynamicContent();
  const edition = await client.editions.get('5b32379e4cedfd01c4504172');
  await edition.related.unschedule();
  const newRequest = await client.editions.get('5b32379e4cedfd01c4504172');

  t.is(newRequest.publishingStatus, 'DRAFT');
});

test('schedule edition (success)', async (t) => {
  const client = new MockDynamicContent();
  const edition = await client.editions.get('5b32379e4cedfd01c4504172');
  const result = await edition.related.schedule(true);

  t.is(result.errors, undefined);
});

test('schedule edition (warning)', async (t) => {
  const client = new MockDynamicContent();
  const edition = await client.editions.get('5b32379e4cedfd01c4504173');
  const result = await edition.related.schedule();

  t.not(result.errors, undefined);
  t.is(result.errors.length, 2);
  t.is(result.errors[0].overlaps[0].editionId, '5b32379e4cedfd01c4504172');
});

test('update edition', async (t) => {
  const client = new MockDynamicContent();
  const edition = await client.editions.get('5b32379e4cedfd01c4504172');

  const mutation = new Edition({
    comment: 'updated',
  });

  const update = await edition.related.update(mutation);
  t.is(update.comment, mutation.comment);
});

test('delete edition', async (t) => {
  const client = new MockDynamicContent();
  const edition = await client.editions.get('5b32379e4cedfd01c4504172');
  const result = await edition.related.delete();

  t.false(result !== undefined);
});

test('list slots', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  const slots = await result.related.slots.list();

  t.is(slots.getItems()[0].slotId, '7aa5f5d4-071c-42e3-b42e-02675c56d60e');
});

test('create slots', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');
  const slots = await result.related.slots.create([
    { slot: '7aa5f5d4-071c-42e3-b42e-02675c56d60e' },
  ]);

  t.is(slots.getItems()[0].slotId, '7aa5f5d4-071c-42e3-b42e-02675c56d60e');
});

test('toJSON should copy resource attributes', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.editions.get('5b32379e4cedfd01c4504172');

  t.deepEqual(result.toJSON(), {
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
    statusUpdated: '2018-06-26T12:54:54.922Z',
  });
});
