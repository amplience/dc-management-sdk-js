/**
 * AuthHeaderProvider is used to provide a getAuthHeader method to provide and authorization header
 * Oauth2AuthHeaderProvider and PatTokenAuthHeaderProvider are two options for providing an AuthHeaderProvider
 */

export interface AuthHeaderProvider {
  getAuthHeader(): Promise<string>;
}
