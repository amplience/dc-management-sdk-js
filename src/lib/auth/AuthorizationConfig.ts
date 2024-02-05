/**
 * AuthorizationConfig
 * @description Either Oauth2AuthHeaderProviderCredentials or a Personal Access Token
 */

export interface AuthorizationConfig {
  patToken?: string;
  client_id?: string;
  client_secret?: string;
}
