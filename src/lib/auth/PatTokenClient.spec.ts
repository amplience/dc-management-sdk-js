import test from 'ava';
import { PatTokenClient } from './PatTokenClient';

test('It should return an auth header for a Pat token', async (t) => {
  const client = new PatTokenClient('amp-pat-token');
  const header = await client.getAuthHeader();
  t.is(header, 'bearer amp-pat-token');
});
