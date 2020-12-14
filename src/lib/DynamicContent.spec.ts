import test from 'ava';
import { MockDynamicContent } from './DynamicContent.mocks';

test('should default auth and api url if not provided', async (t) => {
  const client = new MockDynamicContent({
    client_id: 'client_id',
    client_secret: 'client_secret',
  });

  const hubs = await client.hubs.list();
  t.is(hubs.getItems().length, 1);
});

test('should be able to get a workflow state', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.workflowStates.get('5a497a000000000000000000');
  t.is(result.label, 'Todo');
});
