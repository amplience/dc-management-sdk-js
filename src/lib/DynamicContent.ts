import { AxiosRequestConfig } from 'axios';
import { DefaultHalClient, HalClient } from './hal/services/HalClient';
import { AxiosHttpClient } from './http/AxiosHttpClient';
import { HttpClient } from './http/HttpClient';
import { ContentItem } from './model/ContentItem';
import { ContentRepository } from './model/ContentRepository';
import { ContentType } from './model/ContentType';
import { ContentTypeSchema } from './model/ContentTypeSchema';
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
import { HierarchyParents } from './model/HierarchyParents';
import { HierarchyChildren } from './model/HierarchyChildren';
import { WorkflowState } from './model/WorkflowState';

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
   * This property defaults to 'https://auth.amplience.net' if not provided
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
      ),
  };

  public readonly contentTypeSchemas = {
    /**
     * Gets a content type schemas
     * @param id ContentTypeSchema id
     */
    get: (id: string): Promise<ContentTypeSchema> =>
      this.client.fetchResource(
        `/content-type-schemas/${id}`,
        ContentTypeSchema
      ),

    /**
     * Gets a content type schemas
     * @param id ContentTypeSchema id
     * @param version Version
     */
    getByVersion: (id: string, version: number): Promise<ContentTypeSchema> =>
      this.client.fetchResource(
        `/content-type-schemas/${id}/${version}`,
        ContentTypeSchema
      ),
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
      ),
  };

  /**
   * Hierarchy Resources
   */
  public readonly hierarchies = {
    parents: {
      /**
       * Retrieve parents of the associated content item
       * @param id content item id accociated content item
       */
      get: (id: string): Promise<HierarchyParents> =>
        this.client.fetchResource(
          `/hierarchy-node/${id}/parents`,
          HierarchyParents
        ),
    },
    children: {
      /**
       * Retrieve children of the associated content item
       * @param id content item id accociated content item
       */
      get: (id: string): Promise<HierarchyChildren> =>
        this.client.fetchResource(
          `/hierarchy-node/${id}/children`,
          HierarchyChildren
        ),
    },
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
      this.client.fetchResource(`/content-items/${id}`, ContentItem),
  };

  /**
   * Content Type Resources
   */
  public readonly contentTypes = {
    /**
     * Retrieve a content type resource by id
     * @param id content type id, previously generated on creation
     */
    get: (id: string): Promise<ContentType> =>
      this.client.fetchResource(`/content-types/${id}`, ContentType),
  };

  public readonly folders = {
    /**
     * Retrieve a folder resource by id
     * @param id folder id, previously generated on creation
     */
    get: (id: string): Promise<Folder> =>
      this.client.fetchResource(`/folders/${id}`, Folder),
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
      this.client.fetchResource(`/snapshots/${id}`, Snapshot),
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
      this.client.fetchResource(`/events/${id}`, Event),
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
      this.client.fetchResource(`/editions/${id}`, Edition),
  };

  /**
   * Workflow States
   */
  public readonly workflowStates = {
    /**
     * Retrieve a Workflow State by id
     * @param id of Workflow State, previously generated on creation
     */
    get: (id: string): Promise<WorkflowState> =>
      this.client.fetchResource(`/workflow-states/${id}`, WorkflowState),
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
   * @param httpClient Optional request settings, can be used to provide proxy settings, add interceptors etc
   */
  constructor(
    clientCredentials: Partial<OAuth2ClientCredentials>,
    dcConfig?: DynamicContentConfig,
    httpClient?: AxiosRequestConfig | HttpClient
  ) {
    dcConfig = dcConfig || {};
    dcConfig.apiUrl = dcConfig.apiUrl || 'https://api.amplience.net/v2/content';
    dcConfig.authUrl = dcConfig.authUrl || 'https://auth.amplience.net';

    let httpClientInstance: HttpClient;
    if (httpClient !== undefined && 'request' in httpClient) {
      httpClientInstance = httpClient as HttpClient;
    } else {
      httpClientInstance = new AxiosHttpClient(
        httpClient === undefined ? {} : (httpClient as AxiosRequestConfig)
      );
    }

    const tokenClient = this.createTokenClient(
      dcConfig,
      clientCredentials as OAuth2ClientCredentials,
      httpClientInstance
    );

    this.client = this.createResourceClient(
      dcConfig,
      tokenClient,
      httpClientInstance
    );
  }

  protected createTokenClient(
    dcConfig: DynamicContentConfig,
    clientCredentials: OAuth2ClientCredentials,
    httpClient: HttpClient
  ): AccessTokenProvider {
    return new OAuth2Client(
      clientCredentials,
      {
        authUrl: dcConfig.authUrl,
      },
      httpClient
    );
  }

  protected createResourceClient(
    dcConfig: DynamicContentConfig,
    tokenProvider: AccessTokenProvider,
    httpClient: HttpClient
  ): HalClient {
    return new DefaultHalClient(dcConfig.apiUrl, httpClient, tokenProvider);
  }
}
