import test from 'ava';
import { PatTokenAuthHeaderProvider } from './PatTokenAuthHeaderProvider';

test('It should return an auth header for a Pat token', async (t) => {
  const client = new PatTokenAuthHeaderProvider('amp-pat-token');
  const header = await client.getAuthHeader();
  t.is(header, 'bearer amp-pat-token');
});
