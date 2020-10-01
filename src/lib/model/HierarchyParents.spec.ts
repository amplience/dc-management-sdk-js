import test from 'ava';
import {
  MockDynamicContent,
  HIERARCHY_PARENTS,
  HIERARCHY_CHILDREN,
} from '../DynamicContent.mocks';
import { HierarchyParents } from './HierarchyParents';
import { HierarchyChildren } from './HierarchyChildren';

test('get parents from id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.hierarchys.parents.get(
    'e3ba7f44-8236-41e9-80d3-1ef769c289f4'
  );
  const expected = new HierarchyParents(HIERARCHY_PARENTS as any);

  t.deepEqual(
    result.parents.map((parent) => parent.toJSON()),
    expected.parents.map((parent) => parent.toJSON())
  );
});

test('should beable to get as JSON', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.hierarchys.parents.get(
    'e3ba7f44-8236-41e9-80d3-1ef769c289f4'
  );

  t.deepEqual(result.toJSON(), {
    id: 'e3ba7f44-8236-41e9-80d3-1ef769c289f4',
    contentTypeUri: 'http://release.sort1.com',
    label: 'Lancashire',
    publishingStatus: 'NONE',
    root: false,
    parentId: '07d9e788-6ee8-49a8-b343-7f01d18f5205',
    hasChildren: false,
    repositoryId: '5f647f72c9e77c0001706820',
    parents: [
      {
        id: 'cb1f55f2-e541-4502-bd74-01052edc399d',
        contentTypeUri: 'http://release.sort.com',
        label: 'Countries',
        publishingStatus: 'NONE',
        root: true,
        hasChildren: true,
        repositoryId: '5f647f72c9e77c0001706820',
      },
      {
        id: '07d9e788-6ee8-49a8-b343-7f01d18f5205',
        contentTypeUri: 'http://release.sort.com',
        label: 'England',
        publishingStatus: 'NONE',
        root: false,
        parentId: 'cb1f55f2-e541-4502-bd74-01052edc399d',
        hasChildren: true,
        repositoryId: '5f647f72c9e77c0001706820',
      },
    ],
  });
});

test('should beable to get content item from parents response', async (t) => {
  const client = new MockDynamicContent();
  const parents = await client.hierarchys.parents.get(
    'e3ba7f44-8236-41e9-80d3-1ef769c289f4'
  );

  const contentItem = await parents.related.contentItem.get();

  t.deepEqual(contentItem.hierarchy, {
    root: false,
    parentId: '07d9e788-6ee8-49a8-b343-7f01d18f5205',
  });
});

test('get children from parent', async (t) => {
  const client = new MockDynamicContent();
  const parents = await client.hierarchys.parents.get(
    'e3ba7f44-8236-41e9-80d3-1ef769c289f4'
  );

  const parent = parents.parents[0];
  const result = await parent.related.children.get();
  const expected = new HierarchyChildren(HIERARCHY_CHILDREN as any);

  t.deepEqual(
    result.children.map((parent) => parent.toJSON()),
    expected.children.map((parent) => parent.toJSON())
  );
});
