import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { Folder } from './Folder';

test('list sub-folders', async t => {
  const client = new MockDynamicContent();
  const contentRepository = await client.contentRepositories.get(
    '5b32377b4cedfd01c4503691'
  );

  const folders = await contentRepository.related.folders.list();
  const subfolders = await folders.getItems()[0].related.folders.list();

  t.is(subfolders.getItems()[0].name, 'Another Folder');
});

test('create a sub-folder', async t => {
  const client = new MockDynamicContent();
  const folder = await client.folders.get('5b72ed68d6018001c81ef05b');

  const newFolder = await folder.related.folders.create(
    new Folder({
      name: 'Another Folder'
    })
  );

  t.is(newFolder.name, 'Another Folder');
});
