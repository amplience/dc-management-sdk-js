import { AxiosRequestConfig } from 'axios';
import { DynamicContent, DynamicContentConfig } from './DynamicContent';
import { HalClient } from './hal/services/HalClient';
import { HalLiteral, HalMocks } from './hal/utils/HalMock';
import { AxiosHttpClient } from './http/AxiosHttpClient';
import { HttpClient } from './http/HttpClient';
import { OAuth2ClientCredentials } from './oauth2/models/OAuth2ClientCredentials';

/* tslint:disable:object-literal-sort-keys */

/**
 * @hidden
 */
export const HUB = {
  id: '5b32377e4cedfd01c45036d8',
  name: 'anya-finn',
  label: 'Anya Finn',
  description: 'Content for anyafinn.com',
  status: 'ACTIVE',
  settings: {
    virtualStagingEnvironment: {
      hostname: '',
    },
    previewVirtualStagingEnvironment: {
      hostname: '',
    },
    applications: [],
    devices: [
      {
        name: 'Desktop',
        width: 1024,
        height: 768,
        orientate: false,
      },
      {
        name: 'Tablet',
        width: 640,
        height: 768,
        orientate: false,
      },
      {
        name: 'Mobile',
        width: 320,
        height: 512,
        orientate: false,
      },
    ],
    publishing: {
      platforms: {
        amplience_dam: {
          API_KEY: 'KEY',
          endpoint: 'Endpoint',
        },
      },
    },
  },
  createdBy: 'user',
  createdDate: '2018-06-26T12:54:22.142Z',
  lastModifiedBy: 'user',
  lastModifiedDate: '2018-06-26T12:54:22.142Z',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    snapshots: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/snapshots{?types}{&page,size,sort}',
      templated: true,
    },
    'create-snapshot': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/snapshots',
    },
    events: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/events{?page,size,sort}',
      templated: true,
    },
    'create-event': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/events',
    },
    extensions: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/extensions{?page,size,sort}',
      templated: true,
    },
    'extensions-lite': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/extensions?show-full=false{&page,size,sort}',
      templated: true,
    },
    'extension-by-name': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/extensions/{name}',
      templated: true,
    },
    'create-extension': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/extensions',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    'update-settings': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/settings',
    },
    share: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/share',
    },
    'content-repositories': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/content-repositories{?page,size,sort}',
      templated: true,
    },
    'create-content-repository': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/content-repositories',
    },
    'register-content-type': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/content-types',
    },
    'content-types': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/content-types{?page,size,sort,status}',
      templated: true,
    },
    'list-content-type-schemas': {
      href:
        'https://api.amplience.net/v2/content/hubs/5d4aed7dc9e77c00015fa180/content-type-schemas{?page,size,sort}',
      templated: true,
    },
    'create-content-type-schema': {
      href:
        'https://api.amplience.net/v2/content/hubs/5d4aed7dc9e77c00015fa180/content-type-schemas',
    },
    'search-content-items': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/content-items/find?q={query}{&page,size,sort}',
      templated: true,
    },
    'facet-content-items': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/content-items/facet{?page,projection,query,size,sort}',
      templated: true,
    },
    webhooks: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks{?page,size,sort}',
      templated: true,
    },
    'create-webhook': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks',
    },
    'algolia-search-indexes': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes{?parentId,projection,page,size,sort}',
      templated: true,
    },
    'create-algolia-search-index': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes',
    },
    'workflow-states': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/workflow-states{?page,size,sort}',
      templated: true,
    },
    'create-workflow-state': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/workflow-states',
    },
    'batch-create-snapshots': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/snapshots/batch',
    },
  },
};

/**
 * @hidden
 */
export const CONTENT_ITEM = {
  id: 'a87fd535-fb25-44ee-b687-0db72bbab721',
  folderId: '5b3237784cedfd01c4503658',
  body: {
    _meta: {
      name: 'main-banner',
      schema: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
    },
  },
  version: 1,
  label: 'Banner Ad Homepage',
  status: 'ACTIVE',
  createdBy: 'user',
  createdDate: '2018-06-26T12:54:16.216Z',
  lastModifiedBy: 'user',
  lastModifiedDate: '2018-06-26T12:54:16.216Z',
  deliveryId: 'a87fd535-fb25-44ee-b687-0db72bbab721',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    publish: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/publish',
    },
    planned: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/planned{?epoch,time}',
      templated: true,
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/archive',
    },
    unarchive: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/unarchive',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/versions/1',
    },
    'restore-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/restore',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    'content-item-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/versions{/version}',
      templated: true,
    },
    localizations: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/localizations{?page,size,sort}',
      templated: true,
    },
    'content-item-versions': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/versions{?page,size,sort}',
      templated: true,
    },
    'content-item-history': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/history{?page,size,sort}',
      templated: true,
    },
    copy: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/{id}/content-items?sourceContentItemId=a87fd535-fb25-44ee-b687-0db72bbab721',
      templated: true,
    },
    folder: {
      href:
        'https://api.amplience.net/v2/content/folders/5b3237784cedfd01c4503658',
    },
    'content-item-with-children': {
      href:
        'https://api.amplience.net/v2/content/content-items/search/findByIdWithChildren?id=a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    'set-locale': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/locale',
    },
    'edit-workflow': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/workflow',
    },
  },
};

/**
 * @hidden
 */
export const CONTENT_ITEM_V2 = { ...CONTENT_ITEM };
CONTENT_ITEM_V2.version++;

/**
 * @hidden
 */
export const CONTENT_ITEM_WITH_LOCALE = {
  id: 'a87fd535-fb25-44ee-b687-0db72bbab721',
  folderId: '5b3237784cedfd01c4503658',
  body: {
    _meta: {
      name: 'main-banner',
      schema: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
    },
  },
  version: 1,
  label: 'Banner Ad Homepage',
  status: 'ACTIVE',
  locale: 'en-GB',
  createdBy: 'user',
  createdDate: '2018-06-26T12:54:16.216Z',
  lastModifiedBy: 'user',
  lastModifiedDate: '2018-06-26T12:54:16.216Z',
  deliveryId: 'a87fd535-fb25-44ee-b687-0db72bbab721',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    publish: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/publish',
    },
    planned: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/planned{?epoch,time}',
      templated: true,
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/archive',
    },
    unarchive: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/unarchive',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/versions/1',
    },
    'restore-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/restore',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    'content-item-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/versions{/version}',
      templated: true,
    },
    'content-item-versions': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/versions{?page,size,sort}',
      templated: true,
    },
    'content-item-history': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/history{?page,size,sort}',
      templated: true,
    },
    copy: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/{id}/content-items?sourceContentItemId=a87fd535-fb25-44ee-b687-0db72bbab721',
      templated: true,
    },
    folder: {
      href:
        'https://api.amplience.net/v2/content/folders/5b3237784cedfd01c4503658',
    },
    'content-item-with-children': {
      href:
        'https://api.amplience.net/v2/content/content-items/search/findByIdWithChildren?id=a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    'set-locale': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/locale',
    },
    'create-localizations': {
      href:
        'http://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/localize',
    },
    'edit-workflow': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/workflow',
    },
  },
};

/**
 * @hidden
 */
export const CONTENT_ITEM_WITH_ASSIGNEE = {
  id: 'a87fd535-fb25-44ee-b687-0db72bbab722',
  folderId: '5b3237784cedfd01c4503658',
  body: {
    _meta: {
      name: 'main-banner',
      schema: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
    },
  },
  version: 1,
  label: 'Banner Ad Homepage',
  status: 'ACTIVE',
  createdBy: 'user',
  createdDate: '2018-06-26T12:54:16.216Z',
  lastModifiedBy: 'user',
  lastModifiedDate: '2018-06-26T12:54:16.216Z',
  deliveryId: 'a87fd535-fb25-44ee-b687-0db72bbab722',
  assignees: ['28cf43f6-7521-41c8-9892-8716adcc1e4f'],
  assignedDate: '2018-06-27T12:54:16.216Z',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722',
    },
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722',
    },
    publish: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/publish',
    },
    planned: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/planned{?epoch,time}',
      templated: true,
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/versions/1',
    },
    'restore-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/restore',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    'content-item-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/versions{/version}',
      templated: true,
    },
    'content-item-versions': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/versions{?page,size,sort}',
      templated: true,
    },
    'content-item-history': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/history{?page,size,sort}',
      templated: true,
    },
    copy: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/{id}/content-items?sourceContentItemId=a87fd535-fb25-44ee-b687-0db72bbab722',
      templated: true,
    },
    folder: {
      href:
        'https://api.amplience.net/v2/content/folders/5b3237784cedfd01c4503658',
    },
    'content-item-with-children': {
      href:
        'https://api.amplience.net/v2/content/content-items/search/findByIdWithChildren?id=a87fd535-fb25-44ee-b687-0db72bbab722',
    },
    'set-locale': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab722/locale',
    },
    'edit-workflow': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721/workflow',
    },
  },
};

export const FACETED_CONTENT_ITEM = (() => {
  const facetedContentItem = {
    ...CONTENT_ITEM,
    schema: CONTENT_ITEM.body._meta.schema,
  };
  delete facetedContentItem.body;
  return facetedContentItem;
})();

export const CONTENT_ITEMS_FACET = {
  _embedded: {
    'content-items': [FACETED_CONTENT_ITEM],
  },
  _links: {
    first: {
      href:
        'https://api.amplience.net/v2/content/hubs/5d4aed7dc9e77c00015fa180/content-items/facet?query=status%3A%22ACTIVE%22contentRepositoryId%3A%225d4af2ccc9e77c00015fa183%22sss&sort=relevance&page=0&size=30',
    },
    last: {
      href:
        'https://api.amplience.net/v2/content/hubs/5d4aed7dc9e77c00015fa180/content-items/facet?query=status%3A%22ACTIVE%22contentRepositoryId%3A%225d4af2ccc9e77c00015fa183%22sss&sort=relevance&page=0&size=30',
    },
    self: {
      href:
        'https://api.amplience.net/v2/content/hubs/5d4aed7dc9e77c00015fa180/content-items/facet?query=status%3A%22ACTIVE%22contentRepositoryId%3A%225d4af2ccc9e77c00015fa183%22sss&sort=relevance&page=0&size=30',
    },
  },
  page: {
    size: 30,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  },
  _facets: {
    schema: [
      {
        _id: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
        count: 0,
      },
    ],
    'lastModifiedDate:Last 7 days': [],
    root: [
      {
        _id: '0',
        count: 0,
      },
    ],
    'lastModifiedDate:Last 60 days': [],
    publishingStatus: [],
    assignees: [
      {
        _id: '7078e5e7-d5bf-4015-9add-b75fb6f60537',
        count: 0,
      },
    ],
    'lastModifiedDate:Last 30 days': [],
    'workflow.state': [],
    'lastModifiedDate:Last 14 days': [],
    locale: [],
    'lastModifiedDate:Over 60 days': [],
  },
};

/**
 * @hidden
 */
export const CONTENT_TYPE_SCHEMA = {
  validationLevel: 'CONTENT_TYPE',
  body:
    '{\n\t"$schema": "http://json-schema.org/draft-04/schema#",\n\t"id": "http://example.com/content-type-schema.json",\n\t"title": "Image",\n\t"description": "Image schema",\n\t"allOf": [\n\t\t{\n\t\t\t"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"\n\t\t}\n\t],\n\t"type": "object",\n\t"properties": {\n\t\t"image": {\n\t\t\t"title": "Image",\n\t\t\t"description": "insert an image",\n\t\t\t"type": "object",\n\t\t\t"anyOf": [\n\t\t\t\t{\n\t\t\t\t\t"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/image-link"\n\t\t\t\t}\n\t\t\t]\n\t\t},\n\t\t"altText": {\n\t\t\t"type": "string",\n\t\t\t"minLength": 0,\n\t\t\t"maxLength": 150,\n\t\t\t"title": "Alt text",\n\t\t\t"description": "insert image alt text"\n\t\t}\n\t},\n\t"propertyOrder": [\n\t\t"image",\n\t\t"altText"\n\t],\n\t"required": [\n\t\t"image",\n\t\t"altText"\n\t]\n}',
  schemaId: 'http://example.com/content-type-schema.json',
  createdBy: 'user',
  createdDate: '2018-06-26T12:54:16.216Z',
  lastModifiedBy: 'user',
  lastModifiedDate: '2018-06-26T12:54:16.216Z',
  version: 1,
  id: '5d4af55ced6688002869d808',
  status: 'ACTIVE',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808',
    },
    'content-type-schema': {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5d4aed7dc9e77c00015fa180',
    },
    history: {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808/history',
    },
    getByVersion: {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808/{version}',
      templated: true,
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808/archive',
    },
    unarchive: {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808/unarchive',
    },
    restore: {
      href:
        'https://api.amplience.net/v2/content/content-type-schemas/5d4af55ced6688002869d808/restore',
    },
  },
};

/**
 * @hidden
 */
export const CONTENT_TYPE_SCHEMA_V2 = { ...CONTENT_TYPE_SCHEMA };
CONTENT_TYPE_SCHEMA_V2.version++;

/**
 * @hidden
 */
export const CONTENT_REPOSITORY = {
  id: '5b32377b4cedfd01c4503691',
  name: 'inspiration',
  label: 'Inspiration',
  status: 'ACTIVE',
  features: [],
  type: 'CONTENT',
  contentTypes: [],
  itemLocales: ['en', 'fr'],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377b4cedfd01c4503690',
    },
    'create-content-item': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/content-items',
    },
    'search-content-items': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377b4cedfd01c4503690/content-items/find?q={query}{&page,size,sort}',
      templated: true,
    },
    'content-items': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/content-items{?page,size,sort}',
      templated: true,
    },
    share: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/share',
    },
    'assign-content-type': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/content-types',
    },
    'unassign-content-type': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/content-types/{id}',
      templated: true,
    },
    folders: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/folders{?page,size,sort}',
      templated: true,
    },
    'create-folder': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/folders',
    },
    features: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/features?feature={feature}',
      templated: true,
    },
    'update-content-items': {
      href: 'https://api.amplience.net/v2/content/content-items',
    },
  },
};

/**
 * @hidden
 */
export const CONTENT_REPOSITORY_SLOTS = {
  id: '5b32377b4cedfd01c4503691',
  name: 'slots',
  label: 'Slots',
  status: 'ACTIVE',
  features: ['slots'],
  type: 'CONTENT',
  contentTypes: [],
  itemLocales: ['en', 'fr'],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377b4cedfd01c4503690',
    },
    'create-content-item': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692/content-items',
    },
    'search-content-items': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377b4cedfd01c4503690/content-items/find?q={query}{&page,size,sort}',
      templated: true,
    },
    'content-items': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692/content-items{?page,size,sort}',
      templated: true,
    },
    share: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691/share',
    },
    'assign-content-type': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692/content-types',
    },
    'unassign-content-type': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692/content-types/{id}',
      templated: true,
    },
    folders: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692/folders{?page,size,sort}',
      templated: true,
    },
    'create-folder': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692/folders',
    },
    features: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503692/features?feature={feature}',
      templated: true,
    },
    'update-content-items': {
      href: 'https://api.amplience.net/v2/content/content-items',
    },
  },
};

/**
 * @hidden
 */
export const EVENT = {
  id: '5b32379e4cedfd01c4504171',
  name: 'January Sale',
  comment: 'This is an event.',
  start: '2017-01-01T00:00:00.000Z',
  end: '2017-01-01T23:59:59.000Z',
  brief: 'http://external.doc/mybrief',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171',
    },
    event: {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171/archive',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32379e4cedfd01c4504170',
    },
    editions: {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171/editions{?page,size,sort}',
      templated: true,
    },
    'create-edition': {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171/editions{?sourceEditionId}',
      templated: true,
    },
  },
};

/**
 * @hidden
 */
export const EVENT_V2 = { ...EVENT };
EVENT_V2.comment = 'updated';

/**
 * @hidden
 */
export const EDITION = {
  id: '5b32379e4cedfd01c4504172',
  name: 'January Sale',
  comment: 'This is an example edition.',
  start: '2017-01-01T00:00:00.000Z',
  end: '2017-01-01T23:59:59.000Z',
  eventId: '5b32379e4cedfd01c4504171',
  publishingStatus: 'DRAFT',
  slotsRemaining: 200,
  schedulingErrors: null,
  activeEndDate: false,
  publishingJobId: null,
  statusUpdated: '2018-06-26T12:54:54.922Z',
  schedulingUser: null,
  createdBy: 'user',
  createdDate: '2017-06-05T04:03:02.000Z',
  lastModifiedBy: 'user',
  lastModifiedDate: '2017-06-05T04:03:02.000Z',
  stagedDate: null,
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172',
    },
    edition: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172',
    },
    'create-preview': {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/preview',
    },
    preview: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/preview',
    },
    schedule: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/schedule{?ignoreWarnings}',
      templated: true,
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/archive',
    },
    slots: {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/slots',
    },
    'list-slots': {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/slots{?includedSlots}',
      templated: true,
    },
    event: {
      href:
        'https://api.amplience.net/v2/content/events/5b32379e4cedfd01c4504171',
    },
    'edition-conflicts': {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/conflicts',
    },
    'edition-conflict': {
      href:
        'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504172/conflicts/findByIdAndVersion{?id,version}',
      templated: true,
    },
  },
};

/**
 * @hidden
 */
export const EDITION_V2 = { ...EDITION };
EDITION_V2.comment = 'updated';

/**
 * @hidden
 */
export const EDITION_SCHEDULE_ERROR = {
  errors: [
    {
      level: 'WARNING',
      code: 'EDITION_SCHEDULE_OVERLAP',
      message: 'Edition Schedule Overlap. Please try again later.',
      overlaps: [
        {
          editionId: '5b32379e4cedfd01c4504172',
          name: 'Test schedule edition',
          start: '2022-01-07T15:31:47.337Z',
        },
      ],
    },
    {
      level: 'WARNING',
      code: 'EDITION_CONTAINS_SLOT_COLLISIONS',
      message: 'Edition contains slots that collide with other editions.',
    },
  ],
  _links: {},
};

/**
 * @hidden
 */
export const EDITION_CONFLICT = { ...EDITION };
EDITION_CONFLICT.id = '5b32379e4cedfd01c4504173';
EDITION_CONFLICT._links = { ...EDITION_CONFLICT._links };
EDITION_CONFLICT._links.self = {
  ...EDITION_CONFLICT._links.self,
  href:
    'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504173',
};
EDITION_CONFLICT._links.schedule = {
  ...EDITION_CONFLICT._links.schedule,
  href:
    'https://api.amplience.net/v2/content/editions/5b32379e4cedfd01c4504173/schedule{?ignoreWarnings}',
};

/**
 * @hidden
 */
export const EDITION_SLOT = {
  eventId: '5b32379e4cedfd01c4504171',
  editionId: '5b32379e4cedfd01c4504172',
  createdDate: '2017-06-05T04:03:04.000Z',
  content: {
    body: {
      _meta: {
        schema: 'http://deliver.bigcontent.io/schema/simple-slot-type.json',
        name: 'slot',
      },
    },
    updated: 'no',
  },
  status: 'VALID',
  contentTypeId: '5b3237a24cedfd01c45041cf',
  slotId: '7aa5f5d4-071c-42e3-b42e-02675c56d60e',
  slotLabel: 'Simple Slot',
  conflicts: false,
  empty: true,
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/editions/5b3237a24cedfd01c45041d1/slots/5b3237a24cedfd01c45041d5',
    },
    'edition-slot': {
      href:
        'https://api.amplience.net/v2/content/editions/5b3237a24cedfd01c45041d1/slots/5b3237a24cedfd01c45041d5',
    },
    edition: {
      href:
        'https://api.amplience.net/v2/content/editions/5b3237a24cedfd01c45041d1',
    },
    slot: {
      href:
        'https://api.amplience.net/v2/content/content-items/7aa5f5d4-071c-42e3-b42e-02675c56d60e',
    },
    content: {
      href:
        'https://api.amplience.net/v2/content/editions/5b3237a24cedfd01c45041d1/slots/5b3237a24cedfd01c45041d5/content',
    },
    'safe-update-content': {
      href:
        'https://api.amplience.net/v2/content/editions/5b3237a24cedfd01c45041d1/slots/5b3237a24cedfd01c45041d5/content{?lastModifiedDate,page,size,sort}',
      templated: true,
    },
  },
};

/**
 * @hidden
 */
export const EDITION_SLOT_V2 = { ...EDITION_SLOT };
EDITION_SLOT_V2.content.updated = 'content';

/**
 * @hidden
 */
export const EXTENSION = {
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
      body:
        '{\n  "type": "array",\n  "ui:extension": {\n    "name": "rich-text-block",\n    "params": {\n      "language": "json"\n    }\n  }\n}',
    },
  ],
  settings:
    '{"API":{"READ":false,"EDIT":false},"SANDBOX":{"SAME_ORIGIN":false,"MODALS":false,"NAVIGATION":false,"POPUPS":false,"POPUP_ESCAPE_SANDBOX":false,"DOWNLOADS":false,"FORMS":false}}',
  status: 'ACTIVE',
  createdBy: '4fdd7072-2634-457c-8d34-300e7054fc5b',
  createdDate: '2020-02-12T15:42:12.536Z',
  lastModifiedBy: 'd12ac106-5f27-4a9b-9544-0ff57c0bfa73',
  lastModifiedDate: '2021-03-12T17:11:20.050Z',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/extensions/5e441cd44cedfd0001889389',
    },
    extension: {
      href:
        'https://api.amplience.net/v2/content/extensions/5e441cd44cedfd0001889389',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/extensions/5e441cd44cedfd0001889389',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/extensions/5e441cd44cedfd0001889389',
    },
  },
};

/**
 * @hidden
 */
export const SNAPSHOT = {
  id: '5b3237944cedfd01c45038ae',
  comment: 'This is an example snapshot.',
  createdDate: '2017-06-05T04:03:02Z',
  createdBy: 'thor',
  type: 'USER',
  meta: [],
  taggedEditions: [],
  rootContentItem: {
    label: 'Banner Ad Homepage',
    contentTypeUri:
      'http://deliver.bigcontent.io/schema/nested/nested-type.json',
  },
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/snapshots/5b3237944cedfd01c45038ae',
    },
    snapshot: {
      href:
        'https://api.amplience.net/v2/content/snapshots/5b3237944cedfd01c45038ae',
    },
    'publishing-jobs': {
      href:
        'https://api.amplience.net/v2/content/snapshots/5b3237944cedfd01c45038ae/publishing-jobs{?page,size,sort}',
      templated: true,
    },
    'create-publishing-job': {
      href:
        'https://api.amplience.net/v2/content/snapshots/5b3237944cedfd01c45038ae/publishing-jobs',
    },
    'edition-links': {
      href:
        'https://api.amplience.net/v2/content/snapshots/5b3237944cedfd01c45038ae/edition-links',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b3237944cedfd01c45038a8',
    },
    'content-root': {
      href:
        'https://api.amplience.net/v2/content/content-items/e7a3d579-11fa-4f5e-b580-8f41c96382bf',
    },
    'snapshot-content-item': {
      href:
        'https://api.amplience.net/v2/content/snapshots/5b3237944cedfd01c45038ae/content-items{/id}',
      templated: true,
    },
  },
};

/**
 * @hidden
 */
export const SNAPSHOT_RESULTS = {
  hubId: '5b32377e4cedfd01c45036d8',
  snapshots: [SNAPSHOT],
  _links: {},
};

/**
 * @hidden
 */
export const LOCALIZATION_JOB = {
  status: 'IN_PROGRESS',
  rootContentItem: {
    label: 'Text Content Item',
    locale: 'en-GB',
    id: 'a87fd535-fb25-44ee-b687-0db72bbab721',
  },
  requestedLocales: ['fr-FR'],
  createdBy: 'user',
  createdDate: '2018-10-23T21:46:06.169Z',
  _links: {
    'content-root': {
      href:
        'https://api.amplience.net/v2/content/content-items/a87fd535-fb25-44ee-b687-0db72bbab721',
    },
    findByRootContentItem: {
      href:
        'https://api.amplience.net/v2/content/localization-jobs/search/findByRootContentItem?id=a87fd535-fb25-44ee-b687-0db72bbab721{&page,size,sort}',
      templated: true,
    },
  },
};

/**
 * @hidden
 */
export const FOLDER = {
  id: '5b72ed68d6018001c81ef05b',
  name: 'A folder to end all folders',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05b',
    },
    folder: {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05b',
    },
    folders: {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05b/folders',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b72ed67d6018001c81ef05a',
    },
    'content-items': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b72ed67d6018001c81ef05a/content-items?folderId=5b72ed68d6018001c81ef05b',
    },
    'create-folder': {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05b/folders',
    },
    'delete-folder': {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05b',
    },
    'update-folder': {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05b',
    },
  },
};

/**
 * @hidden
 */
export const NEW_FOLDER = {
  id: '5b72ed68d6018001c81ef05c',
  name: 'Another Folder',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05c',
    },
    folder: {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05c',
    },
    folders: {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05c/folders',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b72ed67d6018001c81ef05a',
    },
    'content-items': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b72ed67d6018001c81ef05a/content-items?folderId=5b72ed68d6018001c81ef05c',
    },
    'create-folder': {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05c/folders',
    },
    'delete-folder': {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05c',
    },
    'update-folder': {
      href:
        'https://api.amplience.net/v2/content/folders/5b72ed68d6018001c81ef05c',
    },
  },
};

/**
 * @hidden
 */
export const SEARCH_INDEX = {
  id: '00112233445566778899aabb',
  replicaCount: 0,
  name: 'anya-finn.my-index',
  suffix: 'my-index',
  label: 'My Index',
  type: 'PRODUCTION',
  createdDate: '2019-01-01T00:00:00.000Z',
  lastModifiedDate: '2019-01-01T00:00:00.000Z',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
    index: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes{/id}',
      templated: true,
    },
    'hub-search-key': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/keys/00112233445566778899aabb',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
    'list-replicas': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes?parentId=00112233445566778899aabb{&projection,page,size,sort}',
      templated: true,
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    settings: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/settings',
    },
    'update-settings': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/settings{?forwardToReplicas}',
      templated: true,
    },
    'assigned-content-types': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types',
    },
    'create-assigned-content-types': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types',
    },
    clear: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/clear',
    },
    stats: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/stats{?period}',
      templated: true,
    },
    'top-searches': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/00112233445566778899aabb/indexes/00112233445566778899aabb/analytics/top-searches{?clickAnalytics,orderBy,direction,startDate,endDate,limit,offset,tags,includeReplicas}',
      templated: true,
    },
    'top-hits': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/00112233445566778899aabb/indexes/00112233445566778899aabb/analytics/top-hits{?search,startDate,endDate,limit,offset,tags}',
      templated: true,
    },
    'searches-with-no-results': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/00112233445566778899aabb/indexes/00112233445566778899aabb/analytics/searches-with-no-results{?startDate,endDate,limit,offset,tags}',
      templated: true,
    },
    'top-filters-no-result-search': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/00112233445566778899aabb/indexes/00112233445566778899aabb/analytics/top-filters-no-result-search{?search,startDate,endDate,limit,offset,tags}',
      templated: true,
    },
    'users-count': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/00112233445566778899aabb/indexes/00112233445566778899aabb/analytics/users-count{?startDate,endDate,tags,includeReplicas}',
      templated: true,
    },
    'searches-count': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/00112233445566778899aabb/indexes/00112233445566778899aabb/analytics/searches-count{?startDate,endDate,tags,includeReplicas}',
      templated: true,
    },
    'no-results-rate': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/00112233445566778899aabb/indexes/00112233445566778899aabb/analytics/no-results-rate{?startDate,endDate,tags,includeReplicas}',
      templated: true,
    },
  },
};

/**
 * @hidden
 */
export const SEARCH_INDEX_UPDATED = { ...SEARCH_INDEX, label: 'Updated Label' };

/**
 * @hidden
 */
export const SEARCH_INDEX_REPLICA = {
  ...SEARCH_INDEX,
  id: '00112233445566778899aabc',
  parentId: '00112233445566778899aabb',
  label: 'replica one',
};

/**
 * @hidden
 */
export const SEARCH_INDEX_SETTINGS = {
  replicas: ['replica one'],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/settings',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    settings: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/settings',
      templated: true,
    },
    index: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
  },
};

/**
 * @hidden
 */

export const SEARCH_INDEX_TOP_SEARCHES = {
  search: 'q0',
  count: 1,
  nbHits: 1,
};

/**
 * @hidden
 */

export const SEARCH_INDEX_TOP_HITS = {
  hit: 'ObjectID',
  count: 123,
};

/**
 * @hidden
 */
export const SEARCH_INDEX_SEARCHES_WITH_NO_RESULTS = {
  search: 'q0',
  count: 3,
  withFilterCount: 10,
};

/**
 * @hidden
 */
export const SEARCH_INDEX_TOP_FILTER_NO_RESULT_SEARCH = {
  count: 3,
  values: [
    {
      attribute: 'brand',
      operator: ':',
      value: 'apple',
    },
  ],
};

/**
 * @hidden
 */
export const SEARCH_INDEX_USERS_COUNT = {
  count: 1,
  dates: [
    {
      count: 1,
      date: '2020-08-01',
    },
  ],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/analytics/users-count',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    'users-count': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/analytics/users-count{?startDate,toDate,tags,includeReplicas}',
      templated: true,
    },
    index: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
  },
};

/**
 * @hidden
 */
export const SEARCH_INDEX_SEARCHES_COUNT = {
  count: 3,
  dates: [
    {
      count: 3,
      date: '2020-08-01',
    },
  ],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/analytics/searches-count',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    'searches-count': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/analytics/searches-count{?startDate,toDate,tags,includeReplicas}',
      templated: true,
    },
    index: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
  },
};

/**
 * @hidden
 */
export const SEARCH_INDEX_NO_RESULTS_RATE = {
  rate: 0.5,
  count: 10,
  noResultRate: 5,
  dates: [
    {
      rate: 0.5,
      count: 10,
      noResultRate: 5,
      date: '2020-08-01',
    },
  ],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/analytics/no-results-rate',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    'no-results-rate': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/analytics/no-results-rate{?startDate,toDate,tags,includeReplicas}',
      templated: true,
    },
    index: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
  },
};

/**
 * @hidden
 */
export const SEARCH_INDEX_SETTINGS_UPDATED = {
  ...SEARCH_INDEX_SETTINGS,
  hitsPerPage: 25,
};

/**
 * @hidden
 */
export const SEARCH_INDEX_STATISTICS = {
  totalRecords: 4,
  totalRecordSize: 256,
  averageRecordSize: 64,
  usage: {
    averageResponseTime: {
      unit: 'DAYS',
      duration: 30,
      value: 1.25,
    },
    numberOfSearches: {
      unit: 'DAYS',
      duration: 30,
      value: 150,
    },
  },
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/stats',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    stats: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/stats',
      templated: true,
    },
    index: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb',
    },
  },
};

/**
 * @hidden
 */
export const ASSIGNED_CONTENT_TYPE = {
  id: '00112233445566778899aabb',
  contentTypeUri: 'http://deliver.bigcontent.io/schema/banner-type.json',
  createdDate: '2020-01-01T00:00:00.000Z',
  lastModifiedDate: '2020-01-01T00:00:00.000Z',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types/00112233445566778899aabb',
    },
    'assigned-content-type': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types/{/id}',
      templated: true,
    },
    'content-type': {
      href:
        'https://api.amplience.net/v2/content/content-types/00112233445566778899aabb',
    },
    unassign: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types/00112233445566778899aabb',
    },
    webhook: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
    'recreate-webhook': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types/00112233445566778899aabb/recreate-webhook?type=active',
    },
    'active-content-webhook': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
    'archived-content-webhook': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
    'recreate-active-content-webhook': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types/00112233445566778899aabb/recreate-webhook?type=active',
    },
    'recreate-archived-content-webhook': {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/assigned-content-types/00112233445566778899aabb/recreate-webhook?type=archived',
    },
  },
};

/**
 * @hidden
 */
export const SEARCH_INDEX_API_KEY = {
  id: '00112233445566778899aabb',
  type: 'HUB_SEARCH',
  key: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
  applicationId: 'AaBbCcDdEeFfGg',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/algolia-search/5b32377e4cedfd01c45036d8/indexes/00112233445566778899aabb/keys/00112233445566778899aabb',
    },
  },
};

/**
 * @hidden
 */
export const WEBHOOK = {
  id: '5a497a000000000000000000',
  label: 'myWebhookSubscription',
  events: ['dynamic-content.edition.scheduled'],
  active: true,
  handlers: ['http://example.com/webhook'],
  notifications: [],
  secret: 'secret',
  createdDate: '2018-01-02T03:04:05Z',
  lastModifiedDate: '2018-01-02T03:04:05Z',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    requests: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000/requests{?cursor,limit}',
      templated: true,
    },
    'event-types': {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/event-types',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
  },
};

export const WEBHOOK_WITH_EXTRAS = {
  id: '5a497a000000000000000000',
  label: 'Unit Test',
  events: ['dynamic-content.content-item.created'],
  active: true,
  handlers: ['http://example.com/webhook'],
  notifications: [],
  secret: 'SECRET',
  createdDate: '2021-04-20T08:08:36.678Z',
  lastModifiedDate: '2021-04-20T08:08:36.678Z',
  headers: [
    {
      key: 'X-Secret',
      value: null,
      secret: true,
    },
    {
      key: 'X-Header',
      value: 'abc123',
      secret: null,
    },
  ],
  filters: [
    {
      type: 'equal',
      arguments: [
        {
          jsonPath: '$.payload.id',
        },
        {
          value: 'abc',
        },
      ],
    },
    {
      type: 'in',
      arguments: [
        {
          jsonPath: '$.payload.id',
        },
        {
          value: ['abc', 'def'],
        },
      ],
    },
    {
      type: 'equal',
      arguments: [
        {
          jsonPath: '$.payload.not_present',
        },
        {
          value: '123',
        },
      ],
    },
  ],
  customPayload: {
    type: 'text/x-handlebars-template',
    value:
      '{{#withDeliveryContentItem contentItemId=payload.id account="myAccountId" stagingEnvironment="myVseUrl"}}{{{JSONstringify this}}}{{/withDeliveryContentItem}}',
  },
  method: 'POST',
  _links: {
    self: {
      href:
        'https://api.amplience-dev.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
    hub: {
      href:
        'https://api.amplience-dev.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    requests: {
      href:
        'https://api.amplience-dev.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000/requests{?cursor,limit,excludeStatus}',
      templated: true,
    },
    'event-types': {
      href:
        'https://api.amplience-dev.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/event-types',
    },
    update: {
      href:
        'https://api.amplience-dev.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
    delete: {
      href:
        'https://api.amplience-dev.net/v2/content/hubs/5b32377e4cedfd01c45036d8/webhooks/5a497a000000000000000000',
    },
  },
};

/**
 * @hidden
 */
export const WORKFLOW_STATE = {
  id: '5a497a000000000000000000',
  label: 'Todo',
  createdBy: '7078e5e7-d5bf-4015-9add-b75fb6f60537',
  createdDate: '2018-01-02T03:04:05Z',
  lastModifiedBy: '7078e5e7-d5bf-4015-9add-b75fb6f60537',
  lastModifiedDate: '2018-01-02T03:04:05Z',
  color: 'rgb(0,0,0)',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/workflow-states/5a497a000000000000000000',
    },
    'workflow-state': {
      href:
        'https://api.amplience.net/v2/content/workflow-states/5a497a000000000000000000',
    },
    hub: {
      href:
        'https://api.amplience.net/v2/content/hubs/5b32377e4cedfd01c45036d8',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/workflow-states/5a497a000000000000000000',
    },
  },
};

/**
 * @hidden
 */
export const WORKFLOW_STATE_UPDATED = { ...WORKFLOW_STATE, label: 'Done' };

/**
 * @hidden
 */
export const CONTENT_ITEM_WITH_WORKFLOW_STATE = {
  ...CONTENT_ITEM,
  workflow: { state: WORKFLOW_STATE.id },
};

export const CONTENT_ITEM_WITH_WORKFLOW_STATE_REMOVED = {
  id: 'f3a2d4ec-8d81-4e7f-9a24-40947e0613d6',
  folderId: '5b3237784cedfd01c4503658',
  body: {
    _meta: {
      name: 'main-banner',
      schema: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
    },
  },
  version: 1,
  label: 'Banner Ad Homepage',
  status: 'ACTIVE',
  locale: 'en-GB',
  createdBy: 'user',
  createdDate: '2018-06-26T12:54:16.216Z',
  lastModifiedBy: 'user',
  lastModifiedDate: '2018-06-26T12:54:16.216Z',
  deliveryId: 'f3a2d4ec-8d81-4e7f-9a24-40947e0613d6',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6',
    },
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6',
    },
    publish: {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/publish',
    },
    planned: {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/planned{?epoch,time}',
      templated: true,
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/archive',
    },
    unarchive: {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/unarchive',
    },
    delete: {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/versions/1',
    },
    'restore-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/restore',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5b32377b4cedfd01c4503691',
    },
    'content-item-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/versions{/version}',
      templated: true,
    },
    'content-item-versions': {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/versions{?page,size,sort}',
      templated: true,
    },
    'content-item-history': {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/history{?page,size,sort}',
      templated: true,
    },
    copy: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/{id}/content-items?sourceContentItemId=f3a2d4ec-8d81-4e7f-9a24-40947e0613d6',
      templated: true,
    },
    folder: {
      href:
        'https://api.amplience.net/v2/content/folders/5b3237784cedfd01c4503658',
    },
    'content-item-with-children': {
      href:
        'https://api.amplience.net/v2/content/content-items/search/findByIdWithChildren?id=f3a2d4ec-8d81-4e7f-9a24-40947e0613d6',
    },
    'set-locale': {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/locale',
    },
    'create-localizations': {
      href:
        'http://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/localize',
    },
    'edit-workflow': {
      href:
        'https://api.amplience.net/v2/content/content-items/f3a2d4ec-8d81-4e7f-9a24-40947e0613d6/workflow',
    },
  },
};

export const CONTENT_ITEM_WITH_WORKFLOW_STATE_ASSIGNED = {
  ...CONTENT_ITEM_WITH_WORKFLOW_STATE_REMOVED,
  workflow: { state: WORKFLOW_STATE.id },
};

/**
 * @hidden
 */
export const CONTENT_TYPE = {
  id: '5be1d5134cedfd01c030c460',
  contentTypeUri: 'http://deliver.bigcontent.io/schema/carousel.json',
  status: 'ACTIVE',
  settings: {
    label: 'Carousel',
    icons: [
      {
        size: 256,
        url: 'https://bigcontent.io/cms/icons/ca-types-grid-mixedmedia.png',
      },
    ],
    visualizations: [
      {
        label: 'Desktop Website',
        templatedUri: 'http://website',
        default: true,
      },
      {
        label: 'Mobile Website',
        templatedUri: 'http://mobile.website',
        default: false,
      },
    ],
  },
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c460',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c460',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c460/archive',
    },
    unarchive: {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c460/unarchive',
    },
    'content-type': {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c460',
    },
    'effective-content-type': {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c460/effective-content-type',
    },
    'content-type-schema': {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c460/schema',
    },
  },
};

/**
 * @hidden
 */
export const ARCHIVED_CONTENT_TYPE = {
  id: '5be1d5134cedfd01c030c461',
  contentTypeUri: 'http://deliver.bigcontent.io/schema/old-carousel.json',
  status: 'ARCHIVED',
  settings: {
    label: 'Old Carousel',
    icons: [
      {
        size: 256,
        url: 'https://bigcontent.io/cms/icons/ca-types-grid-mixedmedia.png',
      },
    ],
    visualizations: [
      {
        label: 'Desktop Website',
        templatedUri: 'http://website',
        default: true,
      },
      {
        label: 'Mobile Website',
        templatedUri: 'http://mobile.website',
        default: false,
      },
    ],
  },
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c461',
    },
    'content-type': {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c461',
    },
    'effective-content-type': {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c461/effective-content-type',
    },
    'content-type-schema': {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c461/schema',
    },
    unarchive: {
      href:
        'https://api.amplience.net/v2/content/content-types/5be1d5134cedfd01c030c461/unarchive',
    },
  },
};

/**
 * @hidden
 */
const CONTENT_TYPE_UPDATED = {
  ...CONTENT_TYPE,
  settings: {
    icons: [
      {
        size: 512,
        url: 'https://bigcontent.io/cms/icons/ca-types-grid-mixedmedia.png',
      },
    ],
    label: 'New Label',
    visualizations: [
      {
        default: true,
        label: 'Desktop Website',
        templatedUri: 'http://example.com',
      },
    ],
  },
};

/**
 * @hidden
 */
export const CONTENT_TYPE_CACHED_SCHEMA = {
  hubId: '5b32377e4cedfd01c45036d8',
  contentTypeUri: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
  cachedSchema: {
    $schema: 'http://bigcontent.io/cms/schema/v1/schema#',
    id: 'http://deliver.bigcontent.io/schema/nested/nested-type.json',
    title: 'Inline content type',
    description: 'Example of an inline content nested content type',
    allOf: [
      {
        $ref: 'http://bigcontent.io/cms/schema/v1/core#/definitions/content',
      },
    ],
    type: 'object',
    properties: {
      inlineExample: {
        type: 'object',
        title: 'this is a title',
        properties: {
          field1: {
            type: 'string',
            title: 'this is a title',
          },
        },
        required: ['field1'],
      },
      internalRefExample: {
        $ref: '#/definitions/mapEntry',
      },
      externalRefExample: {
        $ref: 'http://deliver.bigcontent.io/schema/empty-type.json#',
      },
      arrayExample: {
        type: 'array',
        title: 'this is a title',
        items: {
          $ref: '#/definitions/mapEntry',
        },
      },
    },
    definitions: {
      mapEntry: {
        type: 'object',
        title: 'this is a title',
        properties: {
          key: {
            type: 'string',
            title: 'this is a title',
          },
          value: {
            type: 'string',
            title: 'this is a title',
          },
        },
        required: ['key', 'value'],
      },
    },
  },
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-types/5d8a54cd46e0fb0386cb41f4/schema',
    },
  },
};

/**
 * @hidden
 */

export const HIERARCHY_CONTENT_ITEM = {
  id: 'e3ba7f44-8236-41e9-80d3-1ef769c289f4',
  contentRepositoryId: '5f647f72c9e77c0001706820',
  folderId: '5f648c86c9e77c0001706832',
  body: {
    _meta: {
      name: 'Lancashire',
      schema: 'http://release.sort1.com',
      hierarchy: {
        parentId: '07d9e788-6ee8-49a8-b343-7f01d18f5205',
        root: false,
      },
    },
    string: 'lancashire',
  },
  version: 7,
  label: 'Lancashire',
  status: 'ACTIVE',
  createdBy: '68126707-d044-415a-bf0b-5d0c262e0b6b',
  createdDate: '2020-09-18T10:39:11.180Z',
  lastModifiedBy: '68126707-d044-415a-bf0b-5d0c262e0b6b',
  lastModifiedDate: '2020-09-18T14:41:04.701Z',
  hierarchy: {
    parentId: '07d9e788-6ee8-49a8-b343-7f01d18f5205',
    root: false,
  },
  deliveryId: 'e3ba7f44-8236-41e9-80d3-1ef769c289f4',
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4',
    },
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4{?projection}',
      templated: true,
    },
    planned: {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/planned{?epoch,time}',
      templated: true,
    },
    publish: {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/publish',
    },
    update: {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4',
    },
    'restore-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/restore',
    },
    'content-repository': {
      href:
        'https://api.amplience.net/v2/content/content-repositories/5f647f72c9e77c0001706820',
    },
    'content-item-version': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/versions{/version}',
      templated: true,
    },
    'content-item-versions': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/versions{?page,size,sort}',
      templated: true,
    },
    'content-item-history': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/history{?page,size,sort}',
      templated: true,
    },
    copy: {
      href:
        'https://api.amplience.net/v2/content/content-repositories/{id}/content-items?sourceContentItemId=e3ba7f44-8236-41e9-80d3-1ef769c289f4',
      templated: true,
    },
    unarchive: {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/unarchive',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/archive',
    },
    folder: {
      href:
        'https://api.amplience.net/v2/content/folders/5f648c86c9e77c0001706832',
    },
    'set-locale': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/locale',
    },
    'create-localizations': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/localize',
    },
    localizations: {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/localizations{?page,size,sort}',
      templated: true,
    },
    'localization-jobs': {
      href:
        'https://api.amplience.net/v2/content/localization-jobs/search/findByRootContentItem?id=e3ba7f44-8236-41e9-80d3-1ef769c289f4{&page,size,sort}',
      templated: true,
    },
    'edition-slot-associations': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/edition-slot-associations',
    },
    'edit-workflow': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4/workflow',
    },
    'content-item-with-children': {
      href:
        'https://api.amplience.net/v2/content/content-items/search/findByIdWithChildren?id=e3ba7f44-8236-41e9-80d3-1ef769c289f4',
    },
  },
};
/**
 * @hidden
 */

export const HIERARCHY_NODE_FIRST_CHILD = {
  id: '07d9e788-6ee8-49a8-b343-7f01d18f5205',
  contentTypeUri: 'http://release.sort.com',
  label: 'England',
  publishingStatus: 'NONE',
  root: false,
  parentId: 'cb1f55f2-e541-4502-bd74-01052edc399d',
  hasChildren: true,
  repositoryId: '5f647f72c9e77c0001706820',
  _links: {
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/07d9e788-6ee8-49a8-b343-7f01d18f5205',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-items/07d9e788-6ee8-49a8-b343-7f01d18f5205/archive',
    },
    'get-hierarchy-parents': {
      href:
        'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/parents',
    },
    'get-hierarchy-children': {
      href:
        'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/children',
    },
  },
};
export const HIERARCHY_NODE = {
  id: 'cb1f55f2-e541-4502-bd74-01052edc399d',
  contentTypeUri: 'http://release.sort.com',
  label: 'Countries',
  publishingStatus: 'NONE',
  root: true,
  hasChildren: true,
  repositoryId: '5f647f72c9e77c0001706820',
  _links: {
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/cb1f55f2-e541-4502-bd74-01052edc399d',
    },
    archive: {
      href:
        'https://api.amplience.net/v2/content/content-items/cb1f55f2-e541-4502-bd74-01052edc399d/archive',
    },
    'get-hierarchy-parents': {
      href:
        'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/parents',
    },
    'get-hierarchy-children': {
      href:
        'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/children',
    },
  },
};

/**
 * @hidden
 */
export const HIERARCHY_CHILDREN = {
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
      _links: {
        'content-item': {
          href:
            'https://api.amplience.net/v2/content/content-items/07d9e788-6ee8-49a8-b343-7f01d18f5205',
        },
        archive: {
          href:
            'https://api.amplience.net/v2/content/content-items/07d9e788-6ee8-49a8-b343-7f01d18f5205/archive',
        },
        'get-hierarchy-parents': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/parents',
        },
        'get-hierarchy-children': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/children',
        },
      },
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
      _links: {
        'content-item': {
          href:
            'https://api.amplience.net/v2/content/content-items/cac578af-eab5-42a4-9dc9-4c1e08a6a8e8',
        },
        archive: {
          href:
            'https://api.amplience.net/v2/content/content-items/cac578af-eab5-42a4-9dc9-4c1e08a6a8e8/archive',
        },
        'get-hierarchy-parents': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/cac578af-eab5-42a4-9dc9-4c1e08a6a8e8/parents',
        },
        'get-hierarchy-children': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/cac578af-eab5-42a4-9dc9-4c1e08a6a8e8/children',
        },
      },
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
      _links: {
        'content-item': {
          href:
            'https://api.amplience.net/v2/content/content-items/2e68125c-25b2-45c2-b098-4fd1f8529f88',
        },
        archive: {
          href:
            'https://api.amplience.net/v2/content/content-items/2e68125c-25b2-45c2-b098-4fd1f8529f88/archive',
        },
        'get-hierarchy-parents': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/2e68125c-25b2-45c2-b098-4fd1f8529f88/parents',
        },
        'get-hierarchy-children': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/2e68125c-25b2-45c2-b098-4fd1f8529f88/children',
        },
      },
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
      _links: {
        'content-item': {
          href:
            'https://api.amplience.net/v2/content/content-items/1ee912c5-60fd-4439-8bf5-b9703935999e',
        },
        archive: {
          href:
            'https://api.amplience.net/v2/content/content-items/1ee912c5-60fd-4439-8bf5-b9703935999e/archive',
        },
        'get-hierarchy-parents': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/1ee912c5-60fd-4439-8bf5-b9703935999e/parents',
        },
        'get-hierarchy-children': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/1ee912c5-60fd-4439-8bf5-b9703935999e/children',
        },
      },
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
      _links: {
        'content-item': {
          href:
            'https://api.amplience.net/v2/content/content-items/17d26e9e-302d-4f3d-97ba-590cb70418e1',
        },
        archive: {
          href:
            'https://api.amplience.net/v2/content/content-items/17d26e9e-302d-4f3d-97ba-590cb70418e1/archive',
        },
        'get-hierarchy-parents': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/17d26e9e-302d-4f3d-97ba-590cb70418e1/parents',
        },
        'get-hierarchy-children': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/17d26e9e-302d-4f3d-97ba-590cb70418e1/children',
        },
      },
    },
  ],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/hierarchy-node/cb1f55f2-e541-4502-bd74-01052edc399d/children',
    },
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/cb1f55f2-e541-4502-bd74-01052edc399d',
    },
  },
};

/**
 * @hidden
 */
export const HIERARCHY_PARENTS = {
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
      _links: {
        'content-item': {
          href:
            'https://api.amplience.net/v2/content/content-items/cb1f55f2-e541-4502-bd74-01052edc399d',
        },
        archive: {
          href:
            'https://api.amplience.net/v2/content/content-items/cb1f55f2-e541-4502-bd74-01052edc399d/archive',
        },
        'get-hierarchy-parents': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/cb1f55f2-e541-4502-bd74-01052edc399d/parents',
        },
        'get-hierarchy-children': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/cb1f55f2-e541-4502-bd74-01052edc399d/children',
        },
      },
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
      _links: {
        'content-item': {
          href:
            'https://api.amplience.net/v2/content/content-items/07d9e788-6ee8-49a8-b343-7f01d18f5205',
        },
        archive: {
          href:
            'https://api.amplience.net/v2/content/content-items/07d9e788-6ee8-49a8-b343-7f01d18f5205/archive',
        },
        'get-hierarchy-parents': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/parents',
        },
        'get-hierarchy-children': {
          href:
            'https://api.amplience.net/v2/content/hierarchy-node/07d9e788-6ee8-49a8-b343-7f01d18f5205/children',
        },
      },
    },
  ],
  _links: {
    self: {
      href:
        'https://api.amplience.net/v2/content/hierarchy-node/e3ba7f44-8236-41e9-80d3-1ef769c289f4/parents',
    },
    'content-item': {
      href:
        'https://api.amplience.net/v2/content/content-items/e3ba7f44-8236-41e9-80d3-1ef769c289f4',
    },
  },
};
/* tslint:enable:object-literal-sort-keys */
/**
 * @hidden
 */
export class DynamicContentFixtures {
  public static install(mock: MockAdapter): void {
    const mocks = new HalMocks(mock);

    // Hubs
    mocks.collection('https://api.amplience.net/v2/content/hubs', 'hubs', [
      HUB,
    ]);
    const hubMockResource = mocks
      .resource(HUB)
      .nestedCollection('content-repositories', {}, 'content-repositories', [
        CONTENT_REPOSITORY,
      ])
      .nestedCollection('events', {}, 'events', [EVENT])
      .nestedCreateResource('create-event', {}, EVENT)
      .nestedCollection('extensions', {}, 'extensions', [EXTENSION])
      .nestedCollection('extensions-lite', {}, 'extensions-lite', [EXTENSION])
      .nestedResource(
        'extension-by-name',
        { name: 'test-extension' },
        EXTENSION
      )
      .nestedCreateResource('create-extension', {}, EXTENSION)
      .nestedCollection('webhooks', {}, 'webhooks', [WEBHOOK])
      .nestedCreateResource('create-webhook', {}, WEBHOOK_WITH_EXTRAS)
      .nestedCollection('workflow-states', {}, 'workflow-states', [
        WORKFLOW_STATE,
      ])
      .nestedCreateResource('create-workflow-state', {}, WORKFLOW_STATE)
      .nestedResource('content-types', {}, CONTENT_TYPE)
      .nestedCollection('content-types', {}, 'content-types', [CONTENT_TYPE])
      .nestedCollection(
        'content-types',
        { status: Status.ARCHIVED },
        'content-types',
        [ARCHIVED_CONTENT_TYPE]
      )
      .nestedCollection('workflow-states', {}, 'workflow-states', [
        WORKFLOW_STATE,
      ])
      .nestedUpdateResource('update-settings', {}, undefined)
      .nestedCreateResource('register-content-type', {}, CONTENT_TYPE)
      .nestedCollection(
        'list-content-type-schemas',
        {},
        'content-type-schemas',
        [CONTENT_TYPE_SCHEMA]
      )
      .nestedCreateResource(
        'create-content-type-schema',
        {},
        CONTENT_TYPE_SCHEMA
      )
      .nestedCreateResource('create-workflow-state', {}, WORKFLOW_STATE)
      .nestedCreateResource('create-algolia-search-index', {}, SEARCH_INDEX)
      .nestedCollection('algolia-search-indexes', {}, 'indexes', [SEARCH_INDEX])
      .nestedCreateResource(
        'facet-content-items',
        {
          query:
            'status:"ACTIVE"contentRepositoryId:"5d4af2ccc9e77c00015fa183"',
          page: 0,
          size: 30,
          sort: 'lastModifiedDate,desc',
        },
        CONTENT_ITEMS_FACET
      )
      .nestedCreateResource('batch-create-snapshots', {}, SNAPSHOT_RESULTS);
    hubMockResource.mocks.collection(
      `${hubMockResource.resource._links['self'].href}/content-repositories/search/findByFeaturesContaining?feature=slots`,
      'content-repositories',
      [CONTENT_REPOSITORY_SLOTS]
    );

    // Content items
    mocks
      .resource(CONTENT_ITEM)
      .nestedResource('content-item-version', { version: 1 }, CONTENT_ITEM)
      .nestedUpdateResource('update', {}, CONTENT_ITEM_V2)
      .nestedCreateResource('archive', {}, CONTENT_ITEM)
      .nestedCreateResource('unarchive', {}, CONTENT_ITEM);

    mocks
      .resource(CONTENT_ITEM_WITH_WORKFLOW_STATE_ASSIGNED)
      .nestedUpdateResource(
        'edit-workflow',
        {},
        CONTENT_ITEM_WITH_WORKFLOW_STATE_REMOVED
      );

    // Content type schemas
    mocks
      .resource(CONTENT_TYPE_SCHEMA)
      .nestedResource('hub', {}, HUB)
      .nestedUpdateResource('update', {}, CONTENT_TYPE_SCHEMA_V2)
      .nestedCreateResource('archive', {}, CONTENT_TYPE_SCHEMA)
      .nestedCreateResource('unarchive', {}, CONTENT_TYPE_SCHEMA);

    mocks.resource(
      CONTENT_TYPE_SCHEMA_V2,
      CONTENT_TYPE_SCHEMA_V2._links.self.href + '/2'
    );

    // Content repositories
    mocks
      .resource(CONTENT_REPOSITORY)
      .nestedResource('hub', {}, HUB)
      .nestedCollection('content-items', {}, 'content-items', [CONTENT_ITEM])
      .nestedCreateResource('create-content-item', {}, CONTENT_ITEM)
      .nestedCollection('folders', {}, 'folders', [FOLDER])
      .nestedCreateResource('create-folder', {}, NEW_FOLDER)
      .nestedCreateResource('assign-content-type', {}, CONTENT_REPOSITORY)
      .nestedDelete('unassign-content-type', {
        id: '5be1d5134cedfd01c030c460',
      });

    // Search indexes
    mocks
      .resource(SEARCH_INDEX)
      .nestedCreateResource('clear', {}, SEARCH_INDEX)
      .nestedResource('hub-search-key', {}, SEARCH_INDEX_API_KEY)
      .nestedResource('stats', {}, SEARCH_INDEX_STATISTICS)
      .nestedCollection(
        'top-searches',
        {
          clickAnalytics: 'false',
        },
        'top-searches',
        [SEARCH_INDEX_TOP_SEARCHES]
      )
      .nestedCollection(
        'top-searches',
        {
          clickAnalytics: 'true',
          direction: 'asc',
          endDate: '2020-12-31',
          startDate: '2020-01-01',
          includeReplicas: 'true',
          limit: '10',
          offset: '20',
          orderBy: 'searchCount',
          tags: 'additional_tags',
        },
        'top-searches',
        [SEARCH_INDEX_TOP_SEARCHES]
      )
      .nestedCollection(
        'top-hits',
        {
          endDate: '2020-12-31',
          startDate: '2020-01-01',
          includeReplicas: 'true',
          limit: '10',
          offset: '20',
          tags: 'additional_tags',
        },
        'top-hits',
        [SEARCH_INDEX_TOP_HITS]
      )
      .nestedCollection(
        'top-hits',
        {
          search: 'term',
          endDate: '2020-12-31',
          startDate: '2020-01-01',
          includeReplicas: 'true',
          limit: '10',
          offset: '20',
          tags: 'additional_tags',
        },
        'top-hits',
        [SEARCH_INDEX_TOP_HITS]
      )
      .nestedCollection(
        'searches-with-no-results',
        {
          endDate: '2020-12-31',
          startDate: '2020-01-01',
          includeReplicas: 'true',
          limit: '10',
          offset: '20',
          tags: 'additional_tags',
        },
        'searches-with-no-results',
        [SEARCH_INDEX_SEARCHES_WITH_NO_RESULTS]
      )
      .nestedCollection(
        'top-filters-no-result-search',
        {
          search: 'q0',
          endDate: '2020-12-31',
          startDate: '2020-01-01',
          includeReplicas: 'true',
          limit: '10',
          offset: '20',
          tags: 'additional_tags',
        },
        'top-filters-no-result-search',
        [SEARCH_INDEX_TOP_FILTER_NO_RESULT_SEARCH]
      )
      .nestedResource(
        'users-count',
        {
          endDate: '2020-08-01',
          startDate: '2020-08-01',
          includeReplicas: 'true',
          tags: 'additional_tags',
        },
        SEARCH_INDEX_USERS_COUNT
      )
      .nestedResource(
        'searches-count',
        {
          endDate: '2020-08-01',
          startDate: '2020-08-01',
          includeReplicas: 'true',
          tags: 'additional_tags',
        },
        SEARCH_INDEX_SEARCHES_COUNT
      )
      .nestedResource(
        'no-results-rate',
        {
          endDate: '2020-08-01',
          startDate: '2020-08-01',
          includeReplicas: 'true',
          tags: 'additional_tags',
        },
        SEARCH_INDEX_NO_RESULTS_RATE
      )
      .nestedUpdateResource('update', {}, SEARCH_INDEX_UPDATED)
      .nestedResource('settings', {}, SEARCH_INDEX_SETTINGS)
      .nestedUpdateResource(
        'update-settings',
        {},
        SEARCH_INDEX_SETTINGS_UPDATED
      )
      .nestedCollection('list-replicas', {}, 'indexes', [SEARCH_INDEX_REPLICA])
      .nestedCollection(
        'assigned-content-types',
        {},
        'assigned-content-types',
        [ASSIGNED_CONTENT_TYPE]
      )
      .nestedCreateResource(
        'create-assigned-content-types',
        {},
        ASSIGNED_CONTENT_TYPE
      );

    mocks.deleteResource(
      `${SEARCH_INDEX._links.self.href}/objects/00112233445566778899aabz`
    );

    mocks.postResource(ASSIGNED_CONTENT_TYPE._links['recreate-webhook'].href);

    mocks
      .resource(ASSIGNED_CONTENT_TYPE)
      .nestedDelete('unassign', { id: '00112233445566778899aabb' });

    // Folders
    mocks
      .resource(FOLDER)
      .nestedCreateResource('create-folder', {}, NEW_FOLDER)
      .nestedCollection('folders', {}, 'folders', [NEW_FOLDER]);

    // Events
    mocks
      .resource(EVENT)
      .nestedResource('hub', {}, HUB)
      .nestedCollection('editions', {}, 'editions', [EDITION])
      .nestedCreateResource('create-edition', {}, EDITION)
      .nestedCreateResource('archive', {}, EVENT)
      .nestedUpdateResource('update', {}, EVENT_V2);

    // Editions
    mocks
      .resource(EDITION)
      .nestedCollection('list-slots', {}, 'edition-slots', [EDITION_SLOT])
      .nestedCreateResource('archive', {}, EDITION)
      .nestedDelete('schedule', { id: '5b32379e4cedfd01c4504172' })
      .nestedCreateResource('schedule', { ignoreWarnings: true }, null)
      .nestedUpdateResource('update', {}, EDITION_V2)
      .nestedCreateResource('slots', {}, {
        _links: {},
        _embedded: {
          'edition-slots': [EDITION_SLOT],
        },
      } as HalLiteral);

    mocks
      .resource(EDITION_CONFLICT)
      .nestedCreateResource(
        'schedule',
        { ignoreWarnings: false },
        EDITION_SCHEDULE_ERROR,
        409
      );

    // Edition Slots
    mocks
      .resource(EDITION_SLOT)
      .nestedPutResource('safe-update-content', {}, EDITION_SLOT);

    // Extensions
    mocks
      .resource(EXTENSION)
      .nestedResource('hub', {}, HUB)
      .nestedUpdateResource('update', {}, EXTENSION);

    // Snapshots
    mocks
      .resource(SNAPSHOT)
      .nestedResource('hub', {}, HUB)
      .nestedResource(
        'snapshot-content-item',
        { id: CONTENT_ITEM.id },
        CONTENT_ITEM
      );

    mocks
      .resource(CONTENT_ITEM)
      .nestedUpdateResource(
        'edit-workflow',
        {},
        CONTENT_ITEM_WITH_WORKFLOW_STATE
      )
      .nestedCreateResource(
        'set-locale',
        { locale: 'en-GB', version: 1 },
        CONTENT_ITEM_WITH_LOCALE
      );

    mocks
      .resource(CONTENT_ITEM_WITH_LOCALE)
      .nestedCreateResource(
        'create-localizations',
        { locales: ['fr-FR'], version: 1 },
        LOCALIZATION_JOB
      );

    mocks
      .resource(LOCALIZATION_JOB, 'noself')
      .nestedCollection('findByRootContentItem', {}, 'localization-jobs', [
        LOCALIZATION_JOB,
      ]);

    mocks
      .resource(CONTENT_ITEM)
      .nestedCollection('localizations', {}, 'content-items', [CONTENT_ITEM]);

    // Content Types
    mocks
      .resource(CONTENT_TYPE)
      .nestedUpdateResource('update', {}, CONTENT_TYPE_UPDATED)
      .nestedCreateResource('archive', {}, CONTENT_TYPE)
      .nestedCreateResource('unarchive', {}, CONTENT_TYPE)
      .nestedUpdateResource(
        'content-type-schema',
        {},
        CONTENT_TYPE_CACHED_SCHEMA
      )
      .nestedResource('content-type-schema', {}, CONTENT_TYPE_CACHED_SCHEMA);

    // Webhooks
    mocks
      .resource(WEBHOOK)
      .nestedResource('hub', {}, HUB)
      .nestedUpdateResource('update', {}, WEBHOOK_WITH_EXTRAS);

    // Workflow States
    mocks
      .resource(WORKFLOW_STATE)
      .nestedResource('hub', {}, HUB)
      .nestedUpdateResource('update', {}, WORKFLOW_STATE_UPDATED);

    mocks.resource(CONTENT_ITEM_WITH_ASSIGNEE);

    mocks
      .resource(HIERARCHY_CHILDREN)
      .nestedResource('content-item', {}, HIERARCHY_CONTENT_ITEM);

    mocks
      .resource(HIERARCHY_PARENTS)
      .nestedResource('content-item', {}, HIERARCHY_CONTENT_ITEM);

    mocks
      .resource(HIERARCHY_NODE_FIRST_CHILD, 'noself')
      .nestedResource('get-hierarchy-children', {}, HIERARCHY_CHILDREN)
      .nestedResource('get-hierarchy-parents', {}, HIERARCHY_PARENTS)
      .nestedResource('content-item', {}, HIERARCHY_CONTENT_ITEM);

    mocks
      .resource(HIERARCHY_NODE, 'noself')
      .nestedResource('get-hierarchy-children', {}, HIERARCHY_CHILDREN)
      .nestedResource('get-hierarchy-parents', {}, HIERARCHY_PARENTS)
      .nestedResource('content-item', {}, HIERARCHY_CONTENT_ITEM);
  }
}

/**
 * @hidden
 */
import MockAdapter from 'axios-mock-adapter';
import { Status } from './model/Status';
import { AuthorizationConfig } from './auth/AuthorizationConfig';
import { AuthHeaderProvider } from './auth/AuthHeaderProvider';

/**
 * @hidden
 */
export class MockDynamicContent extends DynamicContent {
  public mock: MockAdapter;

  constructor(
    authCredentials?: AuthorizationConfig,
    dcConfig?: DynamicContentConfig,
    httpClient?: AxiosRequestConfig
  ) {
    super(
      authCredentials || {
        client_id: 'client_id',
        client_secret: 'client_secret',
      },
      dcConfig,
      httpClient
    );
  }

  protected createTokenClient(
    /* eslint-disable unused-imports/no-unused-vars-ts */
    dcConfig: DynamicContentConfig,
    clientCredentials: OAuth2ClientCredentials,
    httpClient: HttpClient
  ): AuthHeaderProvider {
    /* eslint-enable */
    return {
      getAuthHeader: () => Promise.resolve('bearer token'),
    };
  }

  protected createResourceClient(
    dcConfig: DynamicContentConfig,
    tokenProvider: AuthHeaderProvider,
    httpClient: HttpClient
  ): HalClient {
    const client = super.createResourceClient(
      dcConfig,
      tokenProvider,
      httpClient
    );
    this.mock = new MockAdapter((httpClient as AxiosHttpClient).client);
    DynamicContentFixtures.install(this.mock);
    return client;
  }
}
