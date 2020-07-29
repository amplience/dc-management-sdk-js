// tslint:disable:no-expression-statement
import test from 'ava';
import { CURIEs } from './CURIEs';

test('should ignore query parameters that are not provided', (t) => {
  const href = CURIEs.expand('/resource{?page}', {});
  t.is(href, '/resource');
});

test('should replace provided query parameters', (t) => {
  const href = CURIEs.expand('/resource{?page}', { page: 1 });
  t.is(href, '/resource?page=1');
});

test('should replace multiple provided query parameters', (t) => {
  const href = CURIEs.expand('/resource{?page,size}', { page: 1, size: 10 });
  t.is(href, '/resource?page=1&size=10');
});

test('should only include provided query parameters', (t) => {
  const href = CURIEs.expand('/resource{?page,size}', { page: 1 });
  t.is(href, '/resource?page=1');
});

test('should encode query string parameters', (t) => {
  const href = CURIEs.expand('/resource{?page,size}', { page: '=' });
  t.is(href, '/resource?page=%3D');
});

test('should replace path parameters', (t) => {
  const href = CURIEs.expand('/resource/{id}', { id: 1 });
  t.is(href, '/resource/1');
});

test('should replace with empty value if required path parameters missing', (t) => {
  const href = CURIEs.expand('/resource/{id}', {});
  t.is(href, '/resource/');
});

test('should default parameters', (t) => {
  const href = CURIEs.expand('/resource');
  t.is(href, '/resource');
});
