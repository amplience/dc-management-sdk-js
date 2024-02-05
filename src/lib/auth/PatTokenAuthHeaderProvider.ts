import { AuthHeaderProvider } from './AuthHeaderProvider';
export class PatTokenAuthHeaderProvider implements AuthHeaderProvider {
  constructor(private readonly patToken: string) {}

  public async getAuthHeader(): Promise<string> {
    return `bearer ${this.patToken}`;
  }
}
