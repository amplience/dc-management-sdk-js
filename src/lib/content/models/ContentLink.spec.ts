import test from 'ava';
import { ContentLink } from './ContentLink';

test('should identify valid content links', async t => {
  const result = ContentLink.isContentLink({
    _meta: {
      schema:
        'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link'
    }
  });

  await t.truthy(result);
});

test('should identify invalid content links', async t => {
  const result = ContentLink.isContentLink({
    _meta: {
      schema: 'http://bigcontent.io/cms/schema/v1/core#/definitions/image-link'
    }
  });

  await t.falsy(result);
});
