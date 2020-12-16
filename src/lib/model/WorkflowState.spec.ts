import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { WorkflowState } from './WorkflowState';

test('get workflow state by id', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.workflowStates.get(
    '5a497a000000000000000000'
  );
  t.is(result.label, 'Todo');
});

test('list workflow states', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const workflowStates = await hub.related.workflowStates.list();
  t.is(workflowStates.getItems()[0].label, 'Todo');
});

test('update a workflow state', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const workflowState = await hub.related.workflowStates.get(
    '5a497a000000000000000000'
  );
  const result = await workflowState.related.update(
    new WorkflowState({ label: 'Done' })
  );
  t.is(result.label, 'Done');
});

test('get hub', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.workflowStates.get(
    '5a497a000000000000000000'
  );
  const followedHub = await result.related.hub();
  t.is(followedHub.name, 'anya-finn');
});
