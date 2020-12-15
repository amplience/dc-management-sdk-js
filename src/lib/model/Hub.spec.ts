import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentType } from './ContentType';
import { Event } from './Event';
import { WorkflowState } from './WorkflowState';
import { Settings } from './Settings';

test('list hubs', async (t) => {
  const client = new MockDynamicContent();
  const result = await client.hubs.list();
  t.is(result.getItems()[0].name, 'anya-finn');
});

test('get hub by id', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  t.is(hub.name, 'anya-finn');
});

test('list content repositories', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentRepositories.list();
  t.is(result.getItems()[0].name, 'inspiration');
});

test('list of slot content repositories ', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentRepositories.findByFeature('slots');
  t.is(result.getItems()[0].name, 'slots');
});

test('facet the content items ', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentItems.facet(
    {
      fields: [
        {
          facetAs: 'ENUM',
          field: 'schema',
          filter: {
            type: 'IN',
            values: [
              'http://deliver.bigcontent.io/schema/nested/nested-type.json',
            ],
          },
        },
        {
          facetAs: 'ENUM',
          field: 'assignees',
          filter: {
            type: 'IN',
            values: ['7078e5e7-d5bf-4015-9add-b75fb6f60537'],
          },
        },
        { facetAs: 'ENUM', field: 'workflow.state', name: 'workflow.state' },
        { facetAs: 'ENUM', field: 'publishingStatus' },
        {
          facetAs: 'DATE',
          name: 'lastModifiedDate:Last 7 days',
          field: 'lastModifiedDate',
          range: { start: 'NOW', end: '-7:DAYS' },
        },
        {
          facetAs: 'DATE',
          name: 'lastModifiedDate:Last 14 days',
          field: 'lastModifiedDate',
          range: { start: 'NOW', end: '-14:DAYS' },
        },
        {
          facetAs: 'DATE',
          name: 'lastModifiedDate:Last 30 days',
          field: 'lastModifiedDate',
          range: { start: 'NOW', end: '-30:DAYS' },
        },
        {
          facetAs: 'DATE',
          name: 'lastModifiedDate:Last 60 days',
          field: 'lastModifiedDate',
          range: { start: 'NOW', end: '-60:DAYS' },
        },
        {
          facetAs: 'DATE',
          name: 'lastModifiedDate:Over 60 days',
          field: 'lastModifiedDate',
          range: { start: '-60:DAYS', end: '-100:YEARS' },
        },
        { facetAs: 'ENUM', field: 'locale' },
      ],
      returnEntities: true,
    },
    {
      query: 'status:"ACTIVE"contentRepositoryId:"5d4af2ccc9e77c00015fa183"',
      page: 0,
      size: 30,
      sort: 'lastModifiedDate,desc',
    }
  );
  t.is(result.getItems()[0].label, 'Banner Ad Homepage');
  t.is(result.getFacets()['schema'].length, 1);
  t.is(
    result.getItems()[0].schema,
    'http://deliver.bigcontent.io/schema/nested/nested-type.json'
  );
  t.is(
    result.getFacets()['schema'][0]._id,
    'http://deliver.bigcontent.io/schema/nested/nested-type.json'
  );
});

test('list events', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.events.list();
  t.is(result.getItems()[0].name, 'January Sale');
});

test('create event', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.events.create(new Event());
  t.is(result.name, 'January Sale');
});

test('list content types', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentTypes.list();
  t.is(result.getItems()[0].settings.label, 'Carousel');
});

test('get content type', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentTypes.get('5be1d5134cedfd01c030c460');
  t.is(result.settings.label, 'Carousel');
});

test('register content type', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.contentTypes.register(new ContentType());
  t.is(result.id, '5be1d5134cedfd01c030c460');
});

test('update settings', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  await hub.related.settings.update(
    new Settings({
      virtualStagingEnvironment: {
        hostname: 'test.com',
      },
    })
  );

  t.not(hub.settings.virtualStagingEnvironment.hostname, 'test.com');
});

test('list workflow-states', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.workflowStates.list();
  t.is(result.getItems()[0].label, 'Todo');
});

test('create workflow-state', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');
  const result = await hub.related.workflowStates.create(
    new WorkflowState({
      label: 'Todo',
      color: 'rgb(0,0,0)',
    })
  );
  t.is(result.label, 'Todo');
});

test('toJSON should copy resource attributes', async (t) => {
  const client = new MockDynamicContent();
  const hub = await client.hubs.get('5b32377e4cedfd01c45036d8');

  t.deepEqual(hub.toJSON(), {
    createdBy: 'user',
    createdDate: '2018-06-26T12:54:22.142Z',
    description: 'Content for anyafinn.com',
    id: '5b32377e4cedfd01c45036d8',
    label: 'Anya Finn',
    lastModifiedBy: 'user',
    lastModifiedDate: '2018-06-26T12:54:22.142Z',
    name: 'anya-finn',
    settings: {
      applications: [],
      devices: [
        {
          height: 768,
          name: 'Desktop',
          orientate: false,
          width: 1024,
        },
        {
          height: 768,
          name: 'Tablet',
          orientate: false,
          width: 640,
        },
        {
          height: 512,
          name: 'Mobile',
          orientate: false,
          width: 320,
        },
      ],
      previewVirtualStagingEnvironment: {
        hostname: '',
      },
      publishing: {
        platforms: {
          amplience_dam: {
            API_KEY: 'KEY',
            endpoint: 'Endpoint',
          },
        },
      },
      virtualStagingEnvironment: {
        hostname: '',
      },
    },
    status: 'ACTIVE',
  });
});

test('toJSON on a page of resources should copy resource attributes', async (t) => {
  const client = new MockDynamicContent();
  const hubs = await client.hubs.list();

  t.log(hubs.toJSON());

  t.deepEqual(hubs.toJSON(), {
    _embedded: {
      hubs: [
        {
          createdBy: 'user',
          createdDate: '2018-06-26T12:54:22.142Z',
          description: 'Content for anyafinn.com',
          id: '5b32377e4cedfd01c45036d8',
          label: 'Anya Finn',
          lastModifiedBy: 'user',
          lastModifiedDate: '2018-06-26T12:54:22.142Z',
          name: 'anya-finn',
          settings: {
            applications: [],
            devices: [
              {
                height: 768,
                name: 'Desktop',
                orientate: false,
                width: 1024,
              },
              {
                height: 768,
                name: 'Tablet',
                orientate: false,
                width: 640,
              },
              {
                height: 512,
                name: 'Mobile',
                orientate: false,
                width: 320,
              },
            ],
            previewVirtualStagingEnvironment: {
              hostname: '',
            },
            publishing: {
              platforms: {
                amplience_dam: {
                  API_KEY: 'KEY',
                  endpoint: 'Endpoint',
                },
              },
            },
            virtualStagingEnvironment: {
              hostname: '',
            },
          },
          status: 'ACTIVE',
        },
      ],
    },
  });
});
