import test from 'ava';
import { JsonTree } from './JsonTree';

test('should ignore null input', t => {
  const children = [];
  JsonTree.visit(
    null,
    (value: any): void => {
      children.push(value);
    }
  );
  t.deepEqual(children, []);
});

test('should visit array children', t => {
  const children = [];
  JsonTree.visit(
    ['a', 'b', 'c'],
    (value: any): void => {
      children.push(value);
    }
  );
  t.deepEqual(children, ['a', 'b', 'c']);
});

test('should recursively visit array children', t => {
  const children = [];
  JsonTree.visit(
    [['a'], ['b'], 'c'],
    (value: any): void => {
      children.push(value);
    }
  );
  t.deepEqual(children, ['a', ['a'], 'b', ['b'], 'c']);
});

test('should visit object properties', t => {
  const children = [];
  JsonTree.visit(
    { a: 'a', b: 'b', c: 'c' },
    (value: any): void => {
      children.push(value);
    }
  );
  t.deepEqual(children, ['a', 'b', 'c']);
});

test('should recursively visit object properties', t => {
  const children = [];
  JsonTree.visit(
    { a: { a: 'a' }, b: 'b', c: 'c' },
    (value: any): void => {
      children.push(value);
    }
  );
  t.deepEqual(children, ['a', { a: 'a' }, 'b', 'c']);
});

test('should throw if data is self-referential', t => {
  const data: any = { a: 'a' };
  data.b = data;

  // tslint:disable-next-line
  t.throws(() => JsonTree.visit(data, (value: any) => {}));
});
