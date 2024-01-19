import { AuthHeaderProvider } from './AuthHeaderProvider';
import { PersonalAccessToken } from './PersonalAccessToken';
export class PatTokenClient implements AuthHeaderProvider<PersonalAccessToken> {
  constructor(private readonly patToken: string) {}

  public async getToken(): Promise<PersonalAccessToken> {
    return {
      access_token: this.patToken,
    };
  }
}
