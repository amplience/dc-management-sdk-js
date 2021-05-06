import { DynamicContent, ContentItem } from './build/main/index';

const {
  DC_CLIENT_ID,
  DC_CLIENT_SECRET,
  DC_CONTENT_REPO_ID,
  API_URL,
  AUTH_URL,
} = process.env;

if (!DC_CLIENT_ID || !DC_CLIENT_SECRET || !DC_CONTENT_REPO_ID) {
  console.error('Missing env vars.');
  process.exit(1);
}

(async function () {
  try {
    const dcClient = new DynamicContent(
      {
        client_id: DC_CLIENT_ID,
        client_secret: DC_CLIENT_SECRET,
      },
      {
        apiUrl: API_URL,
        authUrl: AUTH_URL,
      }
    );

    const contentRepository = await dcClient.contentRepositories.get(
      DC_CONTENT_REPO_ID
    );
    const name = `End-to-end test - ${new Date().toISOString()}`;
    const newContentItem = new ContentItem({
      label: name,
      body: {
        _meta: {
          schema: 'https://example.com/empty.json',
          name,
        },
      },
    });
    const createdContentItem = await contentRepository.related.contentItems.create(
      newContentItem
    );
    const contentItem = await dcClient.contentItems.get(createdContentItem.id);
    await contentItem.related.archive();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  console.log('\n🎉 All e2e tests passed 🎉\n');
})();
