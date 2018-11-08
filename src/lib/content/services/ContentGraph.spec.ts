import test from 'ava';
import { ContentItem } from '../../model/ContentItem';
import { ContentGraph } from './ContentGraph';

/**
 * @hidden
 */
const FIXTURES = {
  contentA: new ContentItem({
    body: {},
    id: 'contentA',
    label: 'labelA'
  }),
  contentB: new ContentItem({
    body: {},
    id: 'contentB',
    label: 'labelB'
  }),
  contentC: new ContentItem({
    body: {
      children: [
        {
          _meta: {
            schema:
              'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link'
          },
          id: 'contentA'
        },
        {
          _meta: {
            schema:
              'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link'
          },
          id: 'contentB'
        }
      ]
    },
    id: 'contentC',
    label: 'labelC'
  })
};

test('should reject if content fails to load', async t => {
  const result = ContentGraph.deepCopy(
    ['contentA'],
    x => Promise.reject(new Error('')),
    (x, y) => Promise.reject(new Error(''))
  );

  await t.throws(() => result);
});

test('should use content item returned', async t => {
  const result = await ContentGraph.deepCopy(
    ['contentA', 'contentB'],
    id => Promise.resolve(FIXTURES[id]),
    (item: ContentItem, body: any) => {
      if (item.id === 'contentA') {
        return Promise.resolve(FIXTURES.contentB);
      } else {
        return Promise.resolve(FIXTURES.contentA);
      }
    }
  );

  t.deepEqual(result, {
    contentA: 'contentB',
    contentB: 'contentA'
  });
});

test('should visit content-links', async t => {
  const result = await ContentGraph.deepCopy(
    ['contentC'],
    id => Promise.resolve(FIXTURES[id]),
    (item: ContentItem, body: any) => {
      return Promise.resolve(item);
    }
  );

  t.deepEqual(result, {
    contentA: 'contentA',
    contentB: 'contentB',
    contentC: 'contentC'
  });
});

test('should rewrite content-links with the id of the copy', async t => {
  const expected = {
    contentA: 'contentA-copy',
    contentB: 'contentB-copy',
    contentC: 'contentC-copy'
  };

  const result = await ContentGraph.deepCopy(
    ['contentC'],
    id => Promise.resolve(FIXTURES[id]),
    (item: ContentItem, body: any) => {
      const newItem = new ContentItem({
        body,
        id: item.id + '-copy',
        label: item.label + '-copy'
      });

      const oldLinks = ContentGraph.extractLinks(item.body);
      const newLinks = ContentGraph.extractLinks(body);

      for (let i = 0; i < oldLinks.length; i++) {
        const oldLink = oldLinks[i];
        const newLink = newLinks[i];

        if (newLink.id !== expected[oldLink.id]) {
          throw new Error('Link rewrites failed');
        }
      }

      return Promise.resolve(newItem);
    }
  );

  t.deepEqual(result, expected);
});

test('should only process an id once', async t => {
  let callbacks = 0;

  const result = await ContentGraph.deepCopy(
    ['contentA', 'contentA'],
    id => Promise.resolve(FIXTURES[id]),
    (item: ContentItem, body: any) => {
      callbacks++;
      return Promise.resolve(item);
    }
  );

  t.is(callbacks, 1);
});
