/**
 * AuthHeaderProvider is used to provide a getAuthHeader method to provide and authorization header
 * Oauth2Client and PatTokenClient are two options for providing an AuthHeaderProvider
 */

export interface AuthHeaderProvider {
  getAuthHeader(): Promise<string>;
}
