import test from 'ava';
import isEqual from './isEqual';

const primitiveTestCases = [
  [null, null, true],
  [true, true, true],
  [false, false, true],
  [true, false, false],
  [1, 1, true],
  [1, 2, false],
  ['value1', 'value1', true],
  ['value1', 'value2', false],
];

const arrayTestCases = [
  [['value1'], ['value1'], true],
  [['value1'], ['value2'], false],
  [['value1', 'value2'], ['value1', 'value2'], true],
  [['value1', 'value2'], ['value2', 'value1'], false],
  [['value1'], ['value1', 'value2'], false],
];

const objectTestCases = [
  [
    {
      booleanTest: true,
      numberTest: 2,
      nullTest: null,
      stringTest: '<em>',
      arrayTest: ['value 1', 'value 2'],
    },
    {
      booleanTest: true,
      numberTest: 2,
      nullTest: null,
      stringTest: '<em>',
      arrayTest: ['value 1', 'value 2'],
    },
    true,
    'should return true when objects with all types match',
  ],
  [
    { propA: 'valueA', propB: 'valueB', propC: 'valueC' },
    { propB: 'valueB', propA: 'valueA', propC: 'valueC' },
    true,
    'should return true when object property order changes',
  ],
  [
    { propA: 'valueA', propB: 'valueB', propC: 'valueC' },
    { propA: 'valueA', propB: 'valueB' },
    false,
    'should return false when object number of properties differ',
  ],
  [
    { propA: 'valueA', propB: { propC: 'valueC' } },
    { propA: 'valueA', propB: { propC: 'valueC' } },
    true,
    'should return true when object property contains a nested object',
  ],
  [
    { propA: 'valueA', propB: { propC: 'valueC' } },
    { propA: 'valueA', propB: { propC: 'valueD' } },
    false,
    'should return false when object property contains a nested object that differ',
  ],
  [
    { propA: [{ propB: 'valueB' }, { propC: 'valueC' }] },
    { propA: [{ propB: 'valueB' }, { propC: 'valueC' }] },
    true,
    'should return true when object property contains an array of object',
  ],
  [
    { propA: [{ propB: 'valueB' }, { propC: 'valueC' }] },
    { propA: [{ propC: 'valueC' }, { propB: 'valueB' }] },
    false,
    'should return false when object property contains an array of object in different order',
  ],
];

for (const [x, y, result, title] of [
  ...primitiveTestCases,
  ...arrayTestCases,
  ...objectTestCases,
]) {
  const testTitle = title
    ? title
    : `should return ${result} when ${JSON.stringify(x)} === ${JSON.stringify(
        y
      )}`;
  test(`${testTitle}`, (t) => {
    t.is(isEqual(x, y), result);
  });
}
