/**
 * OAuth2 Access Token
 */
export interface AccessToken {
  /**
   * Token attached to requests to assert permissions
   */
  access_token: string;

  /**
   * Token used to refresh the access token after it has expired
   */
  refresh_token: string;

  /**
   * Period (in seconds) for how long the access token will remain valid
   */
  expires_in: number;

  /**
   * Custom field added on the client to remember the exact time when the
   * token is expired
   */
  expires_at_locked_in?: number;
}
