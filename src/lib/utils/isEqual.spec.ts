import test from 'ava';
import isEqual from './isEqual';

const obj1 = {
  replicas: ['replica one'],
};

test.only('should match successfully', (t) => {
  const obj2 = {
    replicas: ['replica one'],
  };

  t.is(isEqual(obj1, obj2), true);
});

test.only('should not match', (t) => {
  const obj2 = {
    replicas: ['replica two'],
  };
  t.is(isEqual(obj1, obj2), false);
});

test.only('should not match with a different length', (t) => {
  const obj2 = {
    replicas: ['replica two'],
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
  };
  t.is(isEqual(obj1, obj2), false);
});
