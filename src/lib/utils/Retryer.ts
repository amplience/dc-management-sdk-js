interface RetryOptions {
  timeout: number;
  delay: number;
}

const defaultOptions: RetryOptions = {
  timeout: 60 * 1000,
  delay: 3 * 1000,
};

const isFunction = (value: unknown) =>
  value &&
  (Object.prototype.toString.call(value) === '[object Function]' ||
    'function' === typeof value ||
    value instanceof Function);

const sleep = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

export async function retry<T>(
  method: () => Promise<T>,
  overrideOptions: Partial<RetryOptions> = {}
): Promise<T> {
  const options: RetryOptions = { ...defaultOptions, ...overrideOptions };

  const startTime = new Date().valueOf();
  while (startTime + options.timeout > new Date().valueOf()) {
    try {
      const result = method();
      if (isFunction(result.then)) {
        return await result;
      }
      return result;
    } catch (_err) {
      // ignore the error
    }

    await sleep(options.delay);
  }
  return Promise.reject(new Error('Retryer timed out'));
}
