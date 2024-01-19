/**
 * AuthHeaderProvider is used to provide a getToken method to provide and authorization token
 * Oauth2Client and PatTokenClient are two options for providing an AuthHeaderProvider
 */

export interface AuthHeaderProvider<T> {
  getToken(): Promise<T>;
}
