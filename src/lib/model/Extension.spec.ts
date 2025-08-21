import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { Extension } from './Extension';

test('get extension by id', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.extensions.get('5e441cd44cedfd0001889389');
  t.is(result.name, 'test-extension');
});

test('delete extension', async (t) => {
  const client = new MockDynamicContent();
  const extension = await client.extensions.get('5e441cd44cedfd0001889389');
  const result = await extension.related.delete();

  t.false(result !== undefined);
});

test('update extension', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.extensions.get('5e441cd44cedfd0001889389');
  const newExtension = await result.related.update(new Extension());

  t.is(newExtension.name, 'test-extension');
});

test('toJSON should copy resource attributes', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.extensions.get('5e441cd44cedfd0001889389');

  t.deepEqual(result.toJSON(), {
    id: '5e441cd44cedfd0001889389',
    hubId: '5b32377e4cedfd01c45036d8',
    name: 'test-extension',
    label: 'Test Extension',
    description:
      'A field for entering and modifying Rich Text, which will be stored as a JSON structure in the content type.',
    url: 'https://example.net/index.html',
    height: 200,
    category: 'CONTENT_FIELD',
    parameters: '{}',
    snippets: [
      {
        label: 'Rich Text Editor (JSON)',
        body: '{\n  "type": "array",\n  "ui:extension": {\n    "name": "rich-text-block",\n    "params": {\n      "language": "json"\n    }\n  }\n}',
      },
    ],
    settings:
      '{"API":{"READ":false,"EDIT":false},"SANDBOX":{"SAME_ORIGIN":false,"MODALS":false,"NAVIGATION":false,"POPUPS":false,"POPUP_ESCAPE_SANDBOX":false,"DOWNLOADS":false,"FORMS":false}}',
    status: 'ACTIVE',
    createdBy: '4fdd7072-2634-457c-8d34-300e7054fc5b',
    createdDate: '2020-02-12T15:42:12.536Z',
    lastModifiedBy: 'd12ac106-5f27-4a9b-9544-0ff57c0bfa73',
    lastModifiedDate: '2021-03-12T17:11:20.050Z',
  });
});

test('get hub', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.extensions.get('5e441cd44cedfd0001889389');
  const hub = await result.related.hub();
  t.is(hub.name, 'anya-finn');
});
