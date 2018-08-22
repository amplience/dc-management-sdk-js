import { AxiosRequestConfig } from 'axios';
import { HalClient } from './hal/services/HalClient';
import { ContentItem } from './model/ContentItem';
import { ContentRepository } from './model/ContentRepository';
import { Edition } from './model/Edition';
import { Event } from './model/Event';
import { Hub, HubsPage } from './model/Hub';
import { Page } from './model/Page';
import { Pageable } from './model/Pageable';
import { Snapshot } from './model/Snapshot';
import { OAuth2ClientCredentials } from './oauth2/models/OAuth2ClientCredentials';
import { OAuth2Client } from './oauth2/services/OAuth2Client';

/**
 * Configuration settings for Dynamic Content API client. You can optionally
 * override these values with environment specific values.
 */
export interface DynamicContentConfig {
  /**
   * URL used to connect to the Amplience Dynamic Content API.
   * This property defaults to 'https://api.amplience.net/v2/content' if not provided
   */
  apiUrl?: string;

  /**
   * URL used to connect to the Amplience OAuth API.
   * This property defaults to 'https://auth.adis.ws' if not provided
   */
  authUrl?: string;
}

/**
 * Amplience Dynamic Content API client.
 *
 * Your application should avoid where possible creating a new client for each request.
 * Authentication tokens are cached by the client and only re-requested when
 * they expire, allowing performance to be improved by reusing the client across requests.
 *
 * If multiple sets of credentials are required your application should create one client
 * per credential set.
 *
 * Example:
 *
 * ```typescript
 * const client = new DynamicContent({
 *    client_id: process.env.CLIENT_ID,
 *    client_secret: process.env.CLIENT_SECRET
 * });
 *
 * const repository = await client.contentRepositories.get('<REPO-ID>');
 *
 * const contentItem = new ContentItem();
 * contentItem.label = 'Homepage Article';
 * contentItem.body = {
 *      _meta: {
 *          schema: "https://github.com/techiedarren/dc-examples/blob/master/content-types/blocks/text-block.json"
 *      },
 *      paragraphs: [
 *          "Example article text..."
 *      ]
 * };
 *
 * await repository.related.contentItems.create(contentItem);
 * ```
 */
export class DynamicContent {
  /**
   * Hub Resources
   */
  public readonly hubs = {
    /**
     * Retrieve a hub resource by id
     * @param id hub id, previously generated on creation
     */
    get: (id: string): Promise<Hub> =>
      this.client.fetchResource(`/hubs/${id}`, Hub),

    /**
     * Retrieve a list of hub resources shared with your client credentials.
     * @param options Pagination options
     */
    list: (options?: Pageable): Promise<Page<Hub>> =>
      this.client.fetchLinkedResource(
        { href: '/hubs{?page,size}', templated: true },
        options,
        HubsPage
      )
  };

  /**
   * Content Repository Resources
   */
  public readonly contentRepositories = {
    /**
     * Retrieve a content repository resource by id
     * @param id content repository id, previously generated on creation
     */
    get: (id: string): Promise<ContentRepository> =>
      this.client.fetchResource(
        `/content-repositories/${id}`,
        ContentRepository
      )
  };

  /**
   * Content Item Resources
   */
  public readonly contentItems = {
    /**
     * Retrieve a content item resource by id
     * @param id content item id, previously generated on creation
     */
    get: (id: string): Promise<ContentItem> =>
      this.client.fetchResource(`/content-items/${id}`, ContentItem)
  };

  /**
   * Snapshot Resources
   */
  public readonly snapshots = {
    /**
     * Retrieve a snapshot resource by id
     * @param id snapshot id, previously generated on creation
     */
    get: (id: string): Promise<Snapshot> =>
      this.client.fetchResource(`/snapshots/${id}`, Snapshot)
  };

  /**
   * Event Resources
   */
  public readonly events = {
    /**
     * Retrieve an event resource by id
     * @param id event id, previously generated on creation
     */
    get: (id: string): Promise<Event> =>
      this.client.fetchResource(`/events/${id}`, Event)
  };

  /**
   * Edition Resources
   */
  public readonly editions = {
    /**
     * Retrieve an edition resource by id
     * @param id edition id, previously generated on creation
     */
    get: (id: string): Promise<Edition> =>
      this.client.fetchResource(`/editions/${id}`, Edition)
  };

  /**
   * @hidden
   */
  private client: HalClient;

  /**
   * Creates a Dynamic Content API client instance. You must provide credentials that will
   * be used to authenticate with the API.
   *
   * @param clientCredentials Api credentials used to generate an authentication token
   * @param dcConfig Optional configuration settings for Dynamic Content
   * @param config Optional request settings, can be used to provide proxy settings, add interceptors etc
   */
  constructor(
    clientCredentials: OAuth2ClientCredentials,
    dcConfig?: DynamicContentConfig,
    config?: AxiosRequestConfig
  ) {
    dcConfig = dcConfig || {};
    dcConfig.apiUrl = dcConfig.apiUrl || 'https://api.amplience.net/v2/content';
    dcConfig.authUrl = dcConfig.authUrl || 'https://auth.adis.ws';

    const authConfig = { ...config };
    const oauth2Client = this.createAuthClient(
      clientCredentials,
      dcConfig,
      authConfig
    );

    const halConfig = { ...config };
    halConfig.baseURL = dcConfig.apiUrl;
    this.client = this.createHalClient(oauth2Client, halConfig);
  }

  /**
   * @hidden
   * @param clientCredentials
   * @param dcConfig
   * @param config
   * @returns {OAuth2Client}
   */
  protected createAuthClient(
    clientCredentials: OAuth2ClientCredentials,
    dcConfig: DynamicContentConfig,
    config?: AxiosRequestConfig
  ): OAuth2Client {
    return new OAuth2Client(
      clientCredentials,
      {
        authUrl: dcConfig.authUrl
      },
      config
    );
  }

  /**
   * @hidden
   * @param auth
   * @param config
   * @returns {HalClient}
   */
  protected createHalClient(
    auth: OAuth2Client,
    config: AxiosRequestConfig
  ): HalClient {
    return new HalClient(
      () => auth.getToken().then(y => y.access_token),
      config
    );
  }
}
