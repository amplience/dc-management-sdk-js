import test from 'ava';
import { MockDynamicContent } from '../DynamicContent.mocks';
import { ContentType } from './ContentType';
import { ContentTypeSchema } from './ContentTypeSchema';

test('get content type by id', async t => {
  const client = new MockDynamicContent();
  const result = await client.contentTypes.get('5be1d5134cedfd01c030c460');
  t.is(
    result.contentTypeUri,
    'http://deliver.bigcontent.io/schema/carousel.json'
  );
});

test('update', async t => {
  const client = new MockDynamicContent();

  const contentType = await client.contentTypes.get('5be1d5134cedfd01c030c460');

  const mutation = new ContentType({
    settings: {
      icons: [
        {
          size: 512,
          url:
            'http://apps.dev-artifacts.adis.ws/cms-icons/develop/v0.4.0/256/ca-types-grid-mixedmedia.png'
        }
      ],
      label: 'New Label',
      visualizations: [
        {
          default: true,
          label: 'Desktop Website',
          templatedUri: 'http://example.com'
        }
      ]
    }
  });

  const update = await contentType.related.update(mutation);
  t.deepEqual(update.settings, mutation.settings);
});

test('contentTypeSchemas.get', async t => {
  const client = new MockDynamicContent();

  const contentType = await client.contentTypes.get('5be1d5134cedfd01c030c460');

  const contentTypeSchema = await contentType.related.contentTypeSchema.get();
  t.is(contentTypeSchema.hubId, '5b32377e4cedfd01c45036d8');
});

test('contentTypeSchemas.update', async t => {
  const client = new MockDynamicContent();

  const contentType = await client.contentTypes.get('5be1d5134cedfd01c030c460');

  const contentTypeSchema = await contentType.related.contentTypeSchema.update(
    new ContentTypeSchema()
  );
  t.is(contentTypeSchema.hubId, '5b32377e4cedfd01c45036d8');
});

test('toJson should copy resource attributes', async t => {
  const client = new MockDynamicContent();
  const resource = await client.contentTypes.get('5be1d5134cedfd01c030c460');
  t.deepEqual(resource.toJson(), {
    contentTypeUri: 'http://deliver.bigcontent.io/schema/carousel.json',
    id: '5be1d5134cedfd01c030c460',
    settings: {
      icons: [
        {
          size: 256,
          url:
            'http://apps.dev-artifacts.adis.ws/cms-icons/develop/v0.4.0/256/ca-types-grid-mixedmedia.png'
        }
      ],
      label: 'Carousel',
      visualizations: [
        {
          default: true,
          label: 'Desktop Website',
          templatedUri: 'http://website'
        },
        {
          default: false,
          label: 'Mobile Website',
          templatedUri: 'http://mobile.website'
        }
      ]
    }
  });
});
