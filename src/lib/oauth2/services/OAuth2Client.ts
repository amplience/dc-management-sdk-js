import { AuthHeaderProvider } from '../../auth/AuthHeaderProvider';
import { HttpClient } from '../../http/HttpClient';
import { HttpMethod } from '../../http/HttpRequest';
import { combineURLs } from '../../utils/URL';
import { AccessToken } from '../models/AccessToken';
import { OAuth2ClientCredentials } from '../models/OAuth2ClientCredentials';

/**
 * @hidden
 */
export class OAuth2Client implements AuthHeaderProvider {
  public httpClient: HttpClient;

  private readonly safelyExpireOffsetSeconds = 30;

  private clientCredentials: OAuth2ClientCredentials;
  private token: AccessToken;
  private tokenExpires: number;
  private inFlight: Promise<AccessToken>;
  private authUrl: string;

  constructor(
    clientCredentials: OAuth2ClientCredentials,
    options: { authUrl?: string } & Record<string, unknown>,
    httpClient: HttpClient
  ) {
    options = { authUrl: 'https://auth.amplience.net', ...options };

    this.authUrl = options.authUrl;
    this.clientCredentials = clientCredentials;
    this.httpClient = httpClient;
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

    if (
      this.token != null &&
      this.tokenExpires - this.safelyExpireOffsetSeconds * 1000 > Date.now()
    ) {
      return this.token;
    }

    const payload =
      'grant_type=client_credentials' +
      '&client_id=' +
      encodeURIComponent(this.clientCredentials.client_id) +
      '&client_secret=' +
      encodeURIComponent(this.clientCredentials.client_secret);

    const request = this.httpClient.request({
      data: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: HttpMethod.POST,
      url: combineURLs(this.authUrl, '/oauth/token'),
    });

    this.inFlight = request.then(
      (response): AccessToken => {
        if (typeof response.data !== 'object') {
          throw new Error(
            'Unexpected response format from /oauth/token endpoint'
          );
        }

        this.token = response.data as any;
        this.tokenExpires = Date.now() + this.token.expires_in * 1000;
        this.inFlight = null;
        return this.token;
      }
    ) as Promise<AccessToken>;

    return this.inFlight;
  }

  /**
   * Returns an authorization header that can be used to make
   * requests to the Dynamic Content api.
   * Tokens are reused until they expire.
   *
   * @returns {Promise<string>}
   */
  public async getAuthHeader(): Promise<string> {
    const token = await this.getToken();

    return 'bearer ' + token.access_token;
  }
}
