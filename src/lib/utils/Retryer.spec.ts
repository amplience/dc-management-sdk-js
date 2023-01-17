import test from 'ava';
import { retry } from './Retryer';

const RETRY_TIMEOUT = 5 * 1000;
const RETRY_DELAY = 2 * 1000;

test('should retry successfully', async (t) => {
  const promise = async () => {
    return Promise.resolve(true);
  };

  const result = await retry(promise, {
    timeout: RETRY_TIMEOUT,
    delay: RETRY_DELAY,
  });
  t.is(result, true);
});

test('should throw an error', async (t) => {
  const promise = async () => {
    return Promise.reject();
  };

  const err = await t.throwsAsync(() =>
    retry(promise, { timeout: RETRY_TIMEOUT, delay: RETRY_DELAY })
  );
  t.is(err.message, 'Retryer timed out');
});

test('should retry successfully on the second attempt', async (t) => {
  let counter = 0;
  const promise = () => {
    counter++;
    const res = counter > 1 ? Promise.resolve() : Promise.reject();
    return res;
  };

  await retry(promise, { timeout: RETRY_TIMEOUT, delay: RETRY_DELAY });
  t.is(counter, 2);
});
