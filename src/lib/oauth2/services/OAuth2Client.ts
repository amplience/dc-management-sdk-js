import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AccessToken } from '../models/AccessToken';
import { AccessTokenProvider } from '../models/AccessTokenProvider';
import { OAuth2ClientCredentials } from '../models/OAuth2ClientCredentials';

/**
 * @hidden
 */
export class OAuth2Client implements AccessTokenProvider {
  public client: AxiosInstance;

  private clientCredentials: OAuth2ClientCredentials;
  private token: AccessToken;
  private tokenExpires: number;
  private inFlight: Promise<AccessToken>;

  constructor(
    clientCredentials: OAuth2ClientCredentials,
    { authUrl = 'https://auth.adis.ws' },
    config?: AxiosRequestConfig
  ) {
    config = config || {};
    config.baseURL = authUrl;
    this.client = axios.create(config);
    this.clientCredentials = clientCredentials;
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

    if (this.token != null && this.tokenExpires > Date.now()) {
      return this.token;
    }

    const payload =
      'grant_type=client_credentials' +
      '&client_id=' +
      encodeURIComponent(this.clientCredentials.client_id) +
      '&client_secret=' +
      encodeURIComponent(this.clientCredentials.client_secret);

    const request = this.client.post('/oauth/token', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    this.inFlight = request.then(
      (response): AccessToken => {
        this.token = response.data;
        this.tokenExpires = Date.now() + this.token.expires_in * 1000;
        this.inFlight = null;
        return this.token;
      }
    ) as Promise<AccessToken>;

    return this.inFlight;
  }
}
