import { AxiosRequestConfig } from 'axios';
import { AxiosHalClient, HalClient } from './hal/services/HalClient';
import { ContentItem } from './model/ContentItem';
import { ContentRepository } from './model/ContentRepository';
import { Edition } from './model/Edition';
import { Event } from './model/Event';
import { Folder } from './model/Folder';
import { Hub, HubsPage } from './model/Hub';
import { Page } from './model/Page';
import { Pageable } from './model/Pageable';
import { Snapshot } from './model/Snapshot';
import { AccessTokenProvider } from './oauth2/models/AccessTokenProvider';
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
 * @hidden
 */
export abstract class DynamicContentClient<CLIENT_CONFIG> {
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

  public readonly folders = {
    /**
     * Retrieve a folder resource by id
     * @param id folder id, previously generated on creation
     */
    get: (id: string): Promise<Folder> =>
      this.client.fetchResource(`/folders/${id}`, Folder)
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
   * @param clientConfig Optional request settings, can be used to provide proxy settings, add interceptors etc
   */
  constructor(
    clientCredentials: OAuth2ClientCredentials,
    dcConfig?: DynamicContentConfig,
    clientConfig?: CLIENT_CONFIG
  ) {
    dcConfig = dcConfig || {};
    dcConfig.apiUrl = dcConfig.apiUrl || 'https://api.amplience.net/v2/content';
    dcConfig.authUrl = dcConfig.authUrl || 'https://auth.adis.ws';

    const tokenClient = this.createTokenClient(
      dcConfig,
      clientConfig,
      clientCredentials
    );
    this.client = this.createResourceClient(
      dcConfig,
      clientConfig,
      tokenClient
    );
  }

  protected abstract createTokenClient(
    dcConfig: DynamicContentConfig,
    clientConfig: CLIENT_CONFIG,
    clientCredentials: OAuth2ClientCredentials
  ): AccessTokenProvider;
  protected abstract createResourceClient(
    dcConfig: DynamicContentConfig,
    clientConfig: CLIENT_CONFIG,
    tokenProvider: AccessTokenProvider
  ): HalClient;
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
export class DynamicContent extends DynamicContentClient<AxiosRequestConfig> {
  protected createTokenClient(
    dcConfig: DynamicContentConfig,
    clientConfig: AxiosRequestConfig,
    clientCredentials: OAuth2ClientCredentials
  ): AccessTokenProvider {
    const config = { ...clientConfig };
    config.baseURL = dcConfig.authUrl;
    return new OAuth2Client(
      clientCredentials,
      {
        authUrl: dcConfig.authUrl
      },
      config
    );
  }

  protected createResourceClient(
    dcConfig: DynamicContentConfig,
    clientConfig: AxiosRequestConfig,
    tokenProvider: AccessTokenProvider
  ): HalClient {
    const config = { ...clientConfig };
    config.baseURL = dcConfig.apiUrl;
    return new AxiosHalClient(tokenProvider, config);
  }
}
