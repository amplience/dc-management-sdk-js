import test from 'ava';
import {
  MockDynamicContent,
  HIERARCHY_CHILDREN,
  HIERARCHY_PARENTS,
} from '../DynamicContent.mocks';
import { HierarchyChildren } from './HierarchyChildren';
import { HierarchyParents } from './HierarchyParents';

test('get children from id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.hierarchys.children.get(
    'cb1f55f2-e541-4502-bd74-01052edc399d'
  );
  const expected = new HierarchyChildren(HIERARCHY_CHILDREN as any);

  t.deepEqual(
    result.children.map((child) => child.toJSON()),
    expected.children.map((child) => child.toJSON())
  );
});

test('should beable to get as JSON', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.hierarchys.children.get(
    'cb1f55f2-e541-4502-bd74-01052edc399d'
  );

  t.deepEqual(result.toJSON(), {
    id: 'cb1f55f2-e541-4502-bd74-01052edc399d',
    contentTypeUri: 'http://release.sort.com',
    label: 'Countries',
    publishingStatus: 'NONE',
    root: true,
    hasChildren: true,
    repositoryId: '5f647f72c9e77c0001706820',
    children: [
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
      {
        id: 'cac578af-eab5-42a4-9dc9-4c1e08a6a8e8',
        contentTypeUri: 'http://release.sort.com',
        label: 'Scotland',
        publishingStatus: 'NONE',
        root: false,
        parentId: 'cb1f55f2-e541-4502-bd74-01052edc399d',
        hasChildren: false,
        repositoryId: '5f647f72c9e77c0001706820',
      },
      {
        id: '2e68125c-25b2-45c2-b098-4fd1f8529f88',
        contentTypeUri: 'http://release.sort.com',
        label: 'USA',
        publishingStatus: 'NONE',
        root: false,
        parentId: 'cb1f55f2-e541-4502-bd74-01052edc399d',
        hasChildren: true,
        repositoryId: '5f647f72c9e77c0001706820',
      },
      {
        id: '1ee912c5-60fd-4439-8bf5-b9703935999e',
        contentTypeUri: 'http://release.sort2.com',
        label: 'Continents',
        publishingStatus: 'NONE',
        root: false,
        parentId: 'cb1f55f2-e541-4502-bd74-01052edc399d',
        hasChildren: false,
        repositoryId: '5f647f72c9e77c0001706820',
      },
      {
        id: '17d26e9e-302d-4f3d-97ba-590cb70418e1',
        contentTypeUri: 'http://release.sort2.com',
        label: 'Hemispheres',
        publishingStatus: 'NONE',
        root: false,
        parentId: 'cb1f55f2-e541-4502-bd74-01052edc399d',
        hasChildren: false,
        repositoryId: '5f647f72c9e77c0001706820',
      },
    ],
  });
});

test('should beable to get content item from children response', async (t) => {
  const client = new MockDynamicContent();
  const children = await client.hierarchys.children.get(
    'cb1f55f2-e541-4502-bd74-01052edc399d'
  );

  const contentItem = await children.related.contentItem.get();

  t.deepEqual(contentItem.hierarchy, {
    root: false,
    parentId: '07d9e788-6ee8-49a8-b343-7f01d18f5205',
  });
});

test('get parents from child', async (t) => {
  const client = new MockDynamicContent();
  const children = await client.hierarchys.children.get(
    'cb1f55f2-e541-4502-bd74-01052edc399d'
  );

  const child = children.children[0];
  const result = await child.related.parents.get();
  const expected = new HierarchyParents(HIERARCHY_PARENTS as any);

  t.deepEqual(
    result.parents.map((parent) => parent.toJSON()),
    expected.parents.map((parent) => parent.toJSON())
  );
});
