import { HttpClient } from '../../http/HttpClient';
import { HttpMethod } from '../../http/HttpRequest';
import { combineURLs } from '../../utils/URL';
import { AccessToken } from '../models/AccessToken';
import { AccessTokenProvider } from '../models/AccessTokenProvider';
import { OAuth2ClientCredentials } from '../models/OAuth2ClientCredentials';
import { AccessTokenStorage } from '../models/AccessTokenStorage';

/**
 * @hidden
 */
export class OAuth2Client implements AccessTokenProvider {
  public httpClient: HttpClient;

  private clientCredentials: OAuth2ClientCredentials;
  private inFlight: Promise<AccessToken>;
  private authUrl: string;
  private storage: AccessTokenStorage;

  constructor(
    clientCredentials: OAuth2ClientCredentials,
    { authUrl = 'https://auth.amplience.net' },
    httpClient: HttpClient,
    storage: AccessTokenStorage
  ) {
    this.authUrl = authUrl;
    this.clientCredentials = clientCredentials;
    this.httpClient = httpClient;
    this.storage = storage;
  }

  /**
   * Requests an authentication token that can be used
   * to make requests to the Dynamic Content api.
   * Tokens are reused until they expire.
   *
   * @returns {Promise<AccessToken>}
   */
  public async getToken(): Promise<AccessToken> {
    if (this.inFlight != null) {
      return this.inFlight;
    }

    const token = await this.storage.getToken(this.clientCredentials.client_id);

    if (token != null && token.expires_at_locked_in > Date.now()) {
      return token;
    }

    const payload =
      'grant_type=client_credentials' +
      '&client_id=' +
      encodeURIComponent(this.clientCredentials.client_id) +
      '&client_secret=' +
      encodeURIComponent(this.clientCredentials.client_secret);

    const request = this.httpClient.request<AccessToken>({
      data: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: HttpMethod.POST,
      url: combineURLs(this.authUrl, '/oauth/token'),
    });

    this.inFlight = request.then(
      async (response): Promise<AccessToken> => {
        if (typeof response.data !== 'object') {
          throw new Error(
            'Unexpected response format from /oauth/token endpoint'
          );
        }

        response.data.expires_at_locked_in =
          Date.now() + response.data.expires_in * 1000;
        await this.storage.saveToken(
          this.clientCredentials.client_id,
          response.data as any
        );
        this.inFlight = null;
        return (response.data as unknown) as AccessToken;
      }
    ) as Promise<AccessToken>;

    return this.inFlight;
  }
}
